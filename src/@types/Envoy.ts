import { Configuration } from "./Configuration";

export interface Envoy {
    get: <T>(url: string) => Promise<T>;
    post: <T>(url: string, options?: Omit<RequestInit, 'method' | 'body'>) => Promise<T>;
    put: <T>(url: string, options?: Omit<RequestInit, 'method' | 'body'>) => Promise<T>;
    patch: <T>(url: string, options?: Omit<RequestInit, 'method' | 'body'>) => Promise<T>;
    delete: <T>(url: string, options?: Omit<RequestInit, 'method' | 'body'>) => Promise<T>;
    setConfig: (newConfig: Partial<Configuration>) => void;
};

export interface DefaultEnvoy extends Envoy {
    create: (config: Configuration) => Envoy;
}
