import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ActionService } from "src/app/shared/services/action.service";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, OnDestroy {
    subscriptions = new Subscription();

    consumers: any[] = [];
    providers: any[] = [];

    constructor(public service: ActionService, private router: Router) {}

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

    register(): void {
        this.router.navigate(["/register"]);
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
