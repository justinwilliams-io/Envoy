import { Configuration } from "./Configuration";
import { RequestWithData, RequestWithoutData } from "./RequestTypes";
export interface Envoy {
    get: RequestWithoutData;
    post: RequestWithData;
    put: RequestWithData;
    patch: RequestWithData;
    delete: RequestWithoutData;
    request: RequestWithoutData;
    setConfig: (newConfig: Partial<Configuration>) => void;
}
export interface DefaultEnvoy extends Envoy {
    create: (config: Configuration) => Envoy;
}
