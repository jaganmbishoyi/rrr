import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ActionService } from "src/app/shared/services/action.service";

@Component({
    selector: "app-org-header",
    templateUrl: "./org-header.component.html",
    styleUrls: ["./org-header.component.scss"],
})
export class OrgHeaderComponent implements OnInit {
    userName: string = "";
    userDetails: any = {};
    portal: "individual" | "provider";

    constructor(private router: Router, public service: ActionService) {}

    ngOnInit(): void {
        this.getUserName();

        this.service.watchStorage().subscribe((res: any) => {
            this.getUserName();
        });

        if (this.router && this.router.url.includes("individual")) {
            this.portal = "individual";
        }

        if (this.router && this.router.url.includes("providers")) {
            this.portal = "provider";
        }
    }

    getUserName(): void {
        this.userDetails = JSON.parse(this.service.getLS("user-details"));

        if (this.userDetails.firstName) {
            this.userName =
                this.userDetails.firstName + " " + this.userDetails.lastName;
        } else {
            this.userName = this.userDetails.name;
        }
    }

    navigateHome(): void {
        switch (this.portal) {
            case "provider":
                this.router.navigate(["/organization/providers"]);
                break;
            case "individual":
                this.router.navigate(["/organization/individual"]);
                break;
        }
    }

    logout(): void {
        this.service.clearLS();
        this.router.navigate(["/"]);
    }
}
