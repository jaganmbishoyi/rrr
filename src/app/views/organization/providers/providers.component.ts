import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ActionService } from "src/app/shared/services/action.service";

@Component({
    selector: "app-providers",
    templateUrl: "./providers.component.html",
    styleUrls: ["./providers.component.scss"],
})
export class ProvidersComponent implements OnInit, OnDestroy {
    subscriptions = new Subscription();
    consumers: any[] = [];
    providers: any[] = [];
    userDetails: any = {};

    constructor(public service: ActionService) {}

    ngOnInit(): void {
        this.userDetails = JSON.parse(this.service.getLS("user-details"));
        this.getConsumers();
        // this.getProviders();
    }

    getConsumers(): void {
        this.subscriptions.add(
            this.service.getConsumers().subscribe((res: any) => {
                this.consumers = res;
            })
        );
    }

    getProviders(): void {
        this.subscriptions.add(
            this.service.getProviders().subscribe((res: any) => {
                this.providers = res;
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
