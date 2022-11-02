import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "app-consumer-card",
    templateUrl: "./consumer-card.component.html",
    styleUrls: ["./consumer-card.component.scss"],
})
export class ConsumerCardComponent implements OnInit {
    @Input() consumer: any;

    constructor() {}

    ngOnInit(): void {}
}
