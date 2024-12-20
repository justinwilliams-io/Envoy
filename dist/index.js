"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const asyncQueue_1 = __importDefault(require("./utils/asyncQueue"));
const createParamString_1 = __importDefault(require("./utils/createParamString"));
const defaultConfig = {
    baseUrl: '',
    errorCallback: (e) => null,
};
const createEnvoy = (customConfig) => {
    let config = Object.assign({ queueEnabled: false, queueMaxRunning: 3, enableProfiling: false, defaultHeaders: {}, profilingLogger: () => null }, customConfig);
    const setConfig = (newConfig) => {
        config = Object.assign(Object.assign({}, config), newConfig);
    };
    const queue = (0, asyncQueue_1.default)(config.queueMaxRunning);
    const requests = {};
    const createRequest = (url, options) => {
        return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
            const _a = options || {}, { headers, method, params } = _a, rest = __rest(_a, ["headers", "method", "params"]);
            try {
                const response = yield fetch(config.baseUrl + url + (0, createParamString_1.default)(params !== null && params !== void 0 ? params : {}), Object.assign({ method: method, headers: Object.assign(Object.assign({}, config.defaultHeaders), headers) }, rest));
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const contentType = response.headers.get('Content-Type');
                if (contentType === null || contentType === void 0 ? void 0 : contentType.includes('application/json')) {
                    const body = yield response.json();
                    resolve(body);
                }
                else if (contentType === null || contentType === void 0 ? void 0 : contentType.includes('text')) {
                    const body = yield response.text();
                    resolve(body);
                }
                else if (contentType === null || contentType === void 0 ? void 0 : contentType.includes('image/')) {
                    const body = yield response.blob();
                    resolve(body);
                }
                else {
                    const body = yield response.text();
                    resolve(body);
                }
            }
            catch (e) {
                config.errorCallback(e);
                reject(e);
            }
        }));
    };
    ['GET', 'DELETE', 'HEAD', 'OPTIONS'].forEach((x) => {
        requests[x] = (url, options) => __awaiter(void 0, void 0, void 0, function* () {
            return request(url, Object.assign(Object.assign({}, options), { method: x.toLowerCase() }));
        });
    });
    ['POST', 'PATCH', 'PUT'].forEach((x) => {
        requests[x] = (url, data, options) => __awaiter(void 0, void 0, void 0, function* () {
            return request(url, Object.assign(Object.assign({}, options), { method: x.toLowerCase(), body: data }));
        });
    });
    const request = (url, options) => __awaiter(void 0, void 0, void 0, function* () {
        if (config.queueEnabled) {
            const promise = yield new Promise((resolve) => {
                queue(() => __awaiter(void 0, void 0, void 0, function* () {
                    resolve(createRequest(url, options));
                }));
            });
            return promise;
        }
        return createRequest(url, options);
    });
    return {
        get: requests['GET'],
        post: requests['POST'],
        put: requests['PUT'],
        patch: requests['PATCH'],
        delete: requests['DELETE'],
        request,
        setConfig,
    };
};
const envoy = createEnvoy(defaultConfig);
envoy.create = createEnvoy;
exports.default = envoy;
