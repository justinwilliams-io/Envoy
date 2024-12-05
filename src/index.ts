import { Configuration } from './@types/Configuration';
import { Envoy } from './@types/Envoy';

const defaultConfig: Configuration = {
    baseUrl: '',
    errorCallback: (e: unknown) => null,
};

const createEnvoy = (customConfig: Configuration): Envoy => {
    const config: Required<Configuration> = {
        useQueue: false,
        queueMaxRunning: 3,
        enableProfiling: false,
        defaultHeaders: {},
        profilingLogger: () => null,
        ...customConfig
    }

    const get = async <T>(url: string, options?: Omit<RequestInit, 'method'>): Promise<T> => {
        return new Promise(async (resolve, reject) => {
            const { headers, ...rest } = options || {};

            try {
                const response = await fetch(config.baseUrl + url, {
                    method: 'GET',
                    headers: { ...config.defaultHeaders, ...headers },
                    ...rest
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const body: T = await response.json();

                resolve(body);
            } catch (e) {
                config.errorCallback(e);
                reject(e)
            }
        });
    };

    const post = async <T>(url: string, requestBody: unknown, options?: Omit<RequestInit, 'method' | 'body'>): Promise<T> => {
        return new Promise(async (resolve, reject) => {
            const { headers, ...rest } = options || {};

            try {
                const response = await fetch(config.baseUrl + url, {
                    method: 'POST',
                    body: JSON.stringify(requestBody),
                    headers: { ...config.defaultHeaders, ...headers },
                    ...rest
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const body: T = await response.json();

                resolve(body);
            } catch (e) {
                config.errorCallback(e);
                reject(e)
            }
        });
    };

    const put = async <T>(url: string, requestBody: unknown, options?: Omit<RequestInit, 'method' | 'body'>): Promise<T> => {
        return new Promise(async (resolve, reject) => {
            const { headers, ...rest } = options || {};

            try {
                const response = await fetch(config.baseUrl + url, {
                    method: 'PUT',
                    body: JSON.stringify(requestBody),
                    headers: { ...config.defaultHeaders, ...headers },
                    ...rest
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const body: T = await response.json();

                resolve(body);
            } catch (e) {
                config.errorCallback(e);
                reject(e)
            }
        });
    };

    const patch = async <T>(url: string, requestBody: unknown, options?: Omit<RequestInit, 'method' | 'body'>): Promise<T> => {
        return new Promise(async (resolve, reject) => {
            const { headers, ...rest } = options || {};

            try {
                const response = await fetch(config.baseUrl + url, {
                    method: 'PATCH',
                    body: JSON.stringify(requestBody),
                    headers: { ...config.defaultHeaders, ...headers },
                    ...rest
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const body: T = await response.json();

                resolve(body);
            } catch (e) {
                config.errorCallback(e);
                reject(e)
            }
        });
    };

    const deleteRequest = async <T>(url: string, options?: Omit<RequestInit, 'method'>): Promise<T> => {
        return new Promise(async (resolve, reject) => {
            const { headers, ...rest } = options || {};

            try {
                const response = await fetch(config.baseUrl + url, {
                    method: 'DELETE',
                    headers: { ...config.defaultHeaders, ...headers },
                    ...rest
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const body: T = await response.json();

                resolve(body);
            } catch (e) {
                config.errorCallback(e);
                reject(e)
            }
        });
    };

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

export default envoy;
