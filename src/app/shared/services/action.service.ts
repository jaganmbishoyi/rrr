import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConstantService } from "./constant.service";

@Injectable({
    providedIn: "root",
})
export class ActionService {
    constructor(
        public http: HttpClient,
        public constantService: ConstantService
    ) {}

    providerLogin(body: any): Observable<any> {
        return this.http.post<any>(
            this.constantService.getUrl(this.constantService.PROVIDERS_LOGIN),
            body
        );
    }

    consumerLogin(body: any): Observable<any> {
        return this.http.post<any>(
            this.constantService.getUrl(this.constantService.CONSUMER_LOGIN),
            body
        );
    }

    registerProvider(body: any): Observable<any> {
        return this.http.post<any>(
            this.constantService.getUrl(
                this.constantService.PROVIDERS_REGISTER
            ),
            body
        );
    }

    registerConsumer(body: any): Observable<any> {
        return this.http.post<any>(
            this.constantService.getUrl(this.constantService.CONSUMER_REGISTER),
            body
        );
    }
}
