export type RequestOptions = Omit<RequestInit, 'method'> & {
    params?: Record<string, any>;
}
