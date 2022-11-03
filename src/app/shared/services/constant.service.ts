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

    INDIVIDUAL_REGISTER = "Individual/IndividualRegistration";
    INDIVIDUAL_LOGIN = "Individual/Auth";
    INDIVIDUAL_UPDATE = "Individual/dummy-endpoint";

    INDIVIDUAL_ADD_POST = "Individual/AddPost";
    INDIVIDUAL_UPDATE_POST = "Individual/UpdatePost";
    INDIVIDUAL_GET_ALL_POST = "Individual/GetAllPost";
    INDIVIDUAL_GET_POST_BY_ID = "Individual/GetPost";

    PROVIDER_ADD_POST = "Providers/AddPost";
    PROVIDER_UPDATE_POST = "Providers/UpdatePost";
    PROVIDER_GET_ALL_POST = "Providers/GetAllPost";
    PROVIDER_GET_POST_BY_ID = "Providers/GetPost";

    getUrl(path: string, params: string[] = []): string {
        return !params.length
            ? [this.API_URL, path].join("")
            : [[this.API_URL, path].join(""), params.join("/")].join("/");
    }
}
