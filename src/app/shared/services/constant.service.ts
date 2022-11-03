import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class ConstantService {
    // API_URL: string = "http://localhost:8090/api/";
    API_URL: string = "https://localhost:44392/api/";

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
    INDIVIDUAL_UPDATE = "Individual/UpdateIndividual";

    INDIVIDUAL_ADD_POST = "Individual/AddPost";
    INDIVIDUAL_UPDATE_POST = "Individual/UpdatePost";
    INDIVIDUAL_GET_POST_BY_ID = "Individual/GetPost";
    GET_POST_BY_INDIVIDUAL_ID = "Individual/GetPostedByIndividual";

    PROVIDER_ADD_POST = "Providers/AddPost";
    PROVIDER_UPDATE_POST = "Providers/UpdatePost";
    PROVIDER_GET_POST_BY_POST_ID = "Providers/GetPost";
    GET_POST_BY_PROVIDER_ID = "Providers/GetPostedByProvider";

    GET_ALL_POST = "Providers/GetAllPost";

    getUrl(path: string, params: string[] = []): string {
        return !params.length
            ? [this.API_URL, path].join("")
            : [[this.API_URL, path].join(""), params.join("/")].join("/");
    }
}
