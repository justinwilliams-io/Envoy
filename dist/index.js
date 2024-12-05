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
Object.defineProperty(exports, "__esModule", { value: true });
const defaultConfig = {
    baseUrl: '',
    errorCallback: (e) => null,
};
const createEnvoy = (customConfig) => {
    const config = Object.assign({ useQueue: false, queueMaxRunning: 3, enableProfiling: false, defaultHeaders: {}, profilingLogger: () => null }, customConfig);
    const get = (url, options) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
            const _a = options || {}, { headers } = _a, rest = __rest(_a, ["headers"]);
            try {
                const response = yield fetch(config.baseUrl + url, Object.assign({ method: 'GET', headers: Object.assign(Object.assign({}, config.defaultHeaders), headers) }, rest));
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const body = yield response.json();
                resolve(body);
            }
            catch (e) {
                config.errorCallback(e);
                reject(e);
            }
        }));
    });
    const post = (url, requestBody, options) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
            const _a = options || {}, { headers } = _a, rest = __rest(_a, ["headers"]);
            try {
                const response = yield fetch(config.baseUrl + url, Object.assign({ method: 'POST', body: JSON.stringify(requestBody), headers: Object.assign(Object.assign({}, config.defaultHeaders), headers) }, rest));
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const body = yield response.json();
                resolve(body);
            }
            catch (e) {
                config.errorCallback(e);
                reject(e);
            }
        }));
    });
    const put = (url, requestBody, options) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
            const _a = options || {}, { headers } = _a, rest = __rest(_a, ["headers"]);
            try {
                const response = yield fetch(config.baseUrl + url, Object.assign({ method: 'PUT', body: JSON.stringify(requestBody), headers: Object.assign(Object.assign({}, config.defaultHeaders), headers) }, rest));
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const body = yield response.json();
                resolve(body);
            }
            catch (e) {
                config.errorCallback(e);
                reject(e);
            }
        }));
    });
    const patch = (url, requestBody, options) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
            const _a = options || {}, { headers } = _a, rest = __rest(_a, ["headers"]);
            try {
                const response = yield fetch(config.baseUrl + url, Object.assign({ method: 'PATCH', body: JSON.stringify(requestBody), headers: Object.assign(Object.assign({}, config.defaultHeaders), headers) }, rest));
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const body = yield response.json();
                resolve(body);
            }
            catch (e) {
                config.errorCallback(e);
                reject(e);
            }
        }));
    });
    const deleteRequest = (url, options) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
            const _a = options || {}, { headers } = _a, rest = __rest(_a, ["headers"]);
            try {
                const response = yield fetch(config.baseUrl + url, Object.assign({ method: 'DELETE', headers: Object.assign(Object.assign({}, config.defaultHeaders), headers) }, rest));
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const body = yield response.json();
                resolve(body);
            }
            catch (e) {
                config.errorCallback(e);
                reject(e);
            }
        }));
    });
    return {
        create: createEnvoy,
        get,
        post,
        put,
        patch,
        delete: deleteRequest,
    };
};
const envoy = createEnvoy(defaultConfig);
exports.default = envoy;
