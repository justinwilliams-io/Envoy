import { Configuration } from "./Configuration";

export interface Envoy {
    create: (configOptions: Configuration) => Envoy;
    get: <T>(url: string) => Promise<T>;
    post: <T>(url: string, requestBody: unknown, options?: Omit<RequestInit, 'method' | 'body'>) => Promise<T>;
    put: <T>(url: string, requestBody: unknown, options?: Omit<RequestInit, 'method' | 'body'>) => Promise<T>;
    patch: <T>(url: string, requestBody: unknown, options?: Omit<RequestInit, 'method' | 'body'>) => Promise<T>;
    delete: <T>(url: string, options?: Omit<RequestInit, 'method' | 'body'>) => Promise<T>;
};
