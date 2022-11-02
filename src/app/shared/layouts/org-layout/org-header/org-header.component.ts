import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ActionService } from "src/app/shared/services/action.service";

@Component({
    selector: "app-org-header",
    templateUrl: "./org-header.component.html",
    styleUrls: ["./org-header.component.scss"],
})
export class OrgHeaderComponent implements OnInit {
    userDetails: any = {};

    constructor(private router: Router, public service: ActionService) {}

    ngOnInit(): void {
        this.userDetails = JSON.parse(this.service.getLS("user-details"));
        this.service.watchStorage().subscribe((res: any) => {
            this.userDetails = JSON.parse(this.service.getLS("user-details"));
        });
    }

    logout(): void {
        this.service.clearLS();
        this.router.navigate(["/"]);
    }
}
