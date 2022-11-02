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
    userDetails: any = {
        address: "Bangalore",
        contactNumber: "8147592535",
        contactPerson: "Ameer",
        createdDate: "2022-10-31T00:00:00",
        id: 1,
        location: "https://goo.gl/maps/oYdNc2WaLwqFdamn9",
        name: "Xyz",
        verified: false,
    };

    constructor(public service: ActionService) {}

    ngOnInit(): void {
        this.getConsumers();
        this.getProviders();
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
