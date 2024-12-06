export type RequestOptions = Omit<RequestInit, 'method'> & {
    params?: Record<string, string | number | boolean>;
};
