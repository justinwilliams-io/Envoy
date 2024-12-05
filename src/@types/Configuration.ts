export type Configuration = {
    baseUrl: string;
    errorCallback: (e: unknown) => void;
    useQueue?: boolean;
    queueMaxRunning?: number;
    enableProfiling?: boolean;
    defaultHeaders? : Record<string, string>;
    profilingLogger?: () => void;
};
