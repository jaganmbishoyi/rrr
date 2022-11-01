import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
    registerType = [
        {
            name: "Provider",
            id: "provider",
        },
        {
            name: "Consumer",
            id: "consumer",
        },
        {
            name: "Individual User",
            id: "individual_user",
        },
    ];

    selectedRegisterType: string = "Provider";

    constructor() {}

    ngOnInit(): void {}

    selectRegisterType(type: string): void {
        this.selectedRegisterType = type;
    }
}
