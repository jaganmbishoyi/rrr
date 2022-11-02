import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ActionService } from "src/app/shared/services/action.service";

@Component({
    selector: "app-consumers",
    templateUrl: "./consumers.component.html",
    styleUrls: ["./consumers.component.scss"],
})
export class ConsumersComponent implements OnInit, OnDestroy {
    subscriptions = new Subscription();
    consumers: any[] = [];
    providers: any[] = [];

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
