export type GetRequestOptions = Omit<RequestInit, 'method'> & {
    method: 'GET';
};

export type PostRequestOptions = Omit<RequestInit, 'method'> & {
    method: 'POST';
};

export type PutRequestOptions = Omit<RequestInit, 'method'> & {
    method: 'PUT';
};

export type PatchRequestOptions = Omit<RequestInit, 'method'> & {
    method: 'PATCH';
};

export type DeleteRequestOptions = Omit<RequestInit, 'method'> & {
    method: 'DELETE';
};
