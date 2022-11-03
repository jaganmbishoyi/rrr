import { isPlatformBrowser } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { ConstantService } from "./constant.service";

@Injectable({
    providedIn: "root",
})
export class ActionService {
    private storageSub = new Subject<string>();

    constructor(
        public http: HttpClient,
        public constantService: ConstantService,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {}

    watchStorage(): Observable<any> {
        return this.storageSub.asObservable();
    }

    setLS(key: string, value: string): void {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(key, value);
            this.storageSub.next("added");
        }
    }

    getLS(key: string): string {
        if (isPlatformBrowser(this.platformId)) {
            return localStorage.getItem(key);
        }
    }

    clearLS(): void {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.clear();
        }
    }

    registerProvider(body: any): Observable<any> {
        return this.http.post<any>(
            this.constantService.getUrl(
                this.constantService.PROVIDERS_REGISTER
            ),
            body
        );
    }

    providerLogin(body: any): Observable<any> {
        body.mobileNumber = String(body.mobileNumber);
        return this.http.post<any>(
            this.constantService.getUrl(this.constantService.PROVIDERS_LOGIN),
            body
        );
    }

    getProviders(): Observable<any> {
        return this.http.get<any>(
            this.constantService.getUrl(this.constantService.GET_PROVIDERS)
        );
    }

    updateProvider(body: any): Observable<any> {
        return this.http.post<any>(
            this.constantService.getUrl(this.constantService.UPDATE_PROVIDER),
            body
        );
    }

    consumerLogin(body: any): Observable<any> {
        return this.http.post<any>(
            this.constantService.getUrl(this.constantService.CONSUMER_LOGIN),
            body
        );
    }

    registerConsumer(body: any): Observable<any> {
        return this.http.post<any>(
            this.constantService.getUrl(this.constantService.CONSUMER_REGISTER),
            body
        );
    }

    getConsumers(): Observable<any> {
        return this.http.get<any>(
            this.constantService.getUrl(this.constantService.GET_CONSUMERS)
        );
    }

    updateConsumer(body: any): Observable<any> {
        return this.http.post<any>(
            this.constantService.getUrl(this.constantService.UPDATE_CONSUMERS),
            body
        );
    }

    registerIndividualUser(body: any): Observable<any> {
        return this.http.post<any>(
            this.constantService.getUrl(
                this.constantService.INDIVIDUAL_REGISTER
            ),
            body
        );
    }

    individualLogin(body: any): Observable<any> {
        return this.http.post<any>(
            this.constantService.getUrl(this.constantService.INDIVIDUAL_LOGIN),
            body
        );
    }

    updateIndividualUser(body: any): Observable<any> {
        return this.http.post<any>(
            this.constantService.getUrl(this.constantService.INDIVIDUAL_UPDATE),
            body
        );
    }

    createIndividualPost(body: any): Observable<any> {
        return this.http.post<any>(
            this.constantService.getUrl(
                this.constantService.INDIVIDUAL_ADD_POST
            ),
            body
        );
    }

    updateIndividualPost(body: any): Observable<any> {
        return this.http.post<any>(
            this.constantService.getUrl(
                this.constantService.INDIVIDUAL_UPDATE_POST
            ),
            body
        );
    }

    getIndividualPostByID(ID: any): Observable<any> {
        return this.http.get<any>(
            this.constantService.getUrl(
                `${this.constantService.INDIVIDUAL_GET_POST_BY_ID}/${ID}`
            )
        );
    }

    getIndividualAllPost(): Observable<any> {
        return this.http.get<any>(
            this.constantService.getUrl(
                this.constantService.INDIVIDUAL_GET_ALL_POST
            )
        );
    }

    createProvidersPost(body: any): Observable<any> {
        return this.http.post<any>(
            this.constantService.getUrl(this.constantService.PROVIDER_ADD_POST),
            body
        );
    }

    updateProvidersPost(body: any): Observable<any> {
        return this.http.post<any>(
            this.constantService.getUrl(
                this.constantService.PROVIDER_UPDATE_POST
            ),
            body
        );
    }

    getProvidersPostByID(ID: any): Observable<any> {
        return this.http.get<any>(
            this.constantService.getUrl(
                `${this.constantService.PROVIDER_GET_POST_BY_ID}/${ID}`
            )
        );
    }

    getProvidersAllPost(): Observable<any> {
        return this.http.get<any>(
            this.constantService.getUrl(
                this.constantService.PROVIDER_GET_ALL_POST
            )
        );
    }
}
