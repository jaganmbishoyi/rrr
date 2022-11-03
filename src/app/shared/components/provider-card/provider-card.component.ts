import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "app-provider-card",
    templateUrl: "./provider-card.component.html",
    styleUrls: ["./provider-card.component.scss"],
})
export class ProviderCardComponent implements OnInit {
    @Input() provider: any;

    constructor() {}

    ngOnInit(): void {}
}
