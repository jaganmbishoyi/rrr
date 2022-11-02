import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class ConstantService {
    API_URL: string = "http://localhost:8090/api/";

    PROVIDERS_REGISTER = "providers";
    PROVIDERS_LOGIN = "providers/auth";
    CONSUMER_REGISTER = "consumers";
    CONSUMER_LOGIN = "consumers/auth";

    getUrl(path: string, params: string[] = []): string {
        return !params.length
            ? [this.API_URL, path].join("")
            : [[this.API_URL, path].join(""), params.join("/")].join("/");
    }
}
