import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-public-header",
    templateUrl: "./public-header.component.html",
    styleUrls: ["./public-header.component.scss"],
})
export class PublicHeaderComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit(): void {}

    home(): void {
        this.router.navigate(["/"]);
    }
    login(): void {
        this.router.navigate(["/login"]);
    }
    register(): void {
        this.router.navigate(["/register"]);
    }
}
