import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class ConstantService {
    API_URL: string = "http://localhost:8090/api/";

    PROVIDERS_REGISTER = "providers";
    PROVIDERS_LOGIN = "providers/auth";
    GET_PROVIDERS = "Providers/GetProviders";
    UPDATE_PROVIDER = "Providers/UpdateProviders";

    CONSUMER_REGISTER = "consumers";
    CONSUMER_LOGIN = "consumers/auth";
    GET_CONSUMERS = "Consumers/GetConsumers";
    UPDATE_CONSUMERS = "Consumers/UpdateConsumer";

    getUrl(path: string, params: string[] = []): string {
        return !params.length
            ? [this.API_URL, path].join("")
            : [[this.API_URL, path].join(""), params.join("/")].join("/");
    }
}
