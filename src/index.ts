import { Configuration } from './@types/Configuration';
import { DefaultEnvoy, Envoy } from './@types/Envoy';
import { RequestOptions } from './@types/RequestOptions';
import asyncQueue from './utils/asyncQueue';
import createParamString from './utils/createParamString';

const defaultConfig: Configuration = {
    baseUrl: '',
    errorCallback: (e: unknown) => null,
};

const createEnvoy = (customConfig: Configuration): Envoy => {
    let config: Required<Configuration> = {
        queueEnabled: false,
        queueMaxRunning: 3,
        enableProfiling: false,
        defaultHeaders: {},
        profilingLogger: () => null,
        ...customConfig
    };

    const setConfig = (newConfig: Partial<Configuration>): void => {
        config = { ...config, ...newConfig };
    };

    const queueMap: Record<string, (request: () => Promise<void>) => void> = {};
    const requests: Record<string, any> = {};

    const createRequest = <T>(url: string, options?: any): Promise<T> => {
        return new Promise<T>(async (resolve, reject) => {
            const { headers, method, params, ...rest } = options || {};

            try {
                const response = await fetch(config.baseUrl + url + createParamString(params ?? {}), {
                    method: method,
                    headers: { ...config.defaultHeaders, ...headers },
                    ...rest
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const contentType = response.headers.get('Content-Type');

                if (contentType?.includes('application/json')) {
                    const body: T = await response.json();
                    resolve(body);
                } else if (contentType?.includes('text')) {
                    const body = await response.text() as T;
                    resolve(body);
                } else if (contentType?.includes('image/')) {
                    const body = await response.blob() as T;
                    resolve(body);
                } else {
                    const body = await response.text() as T;
                    resolve(body);
                }
            } catch (e) {
                config.errorCallback(e);
                reject(e)
            }
        });
    }

    ['GET', 'DELETE', 'HEAD', 'OPTIONS'].forEach((x: string): void => {
        requests[x] = async <T>(url: string, options?: RequestOptions): Promise<T> => {
            return request(url, { ...options, method: x.toLowerCase() });
        };
    });

    ['POST', 'PATCH', 'PUT'].forEach((x: string): void => {
        requests[x] = async <T>(url: string, data: BodyInit, options?: RequestOptions): Promise<T> => {
            return request(url, { ...options, method: x.toLowerCase(), body: data });
        }
    });

    const request = async <T>(url: string, options?: RequestInit): Promise<T> => {
        if (config.queueEnabled) {
            if (!Object.keys(queueMap).includes(url)) {
                queueMap[url] = asyncQueue(config.queueMaxRunning);
            }

            const promise = await new Promise<T>((resolve) => {
                queueMap[url](async () => {
                    resolve(createRequest<T>(url, options));
                });
            });

            return promise;
        }

        return createRequest<T>(url, options);
    }

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

const envoy: DefaultEnvoy = createEnvoy(defaultConfig) as DefaultEnvoy;
envoy.create = createEnvoy;

export default envoy;
