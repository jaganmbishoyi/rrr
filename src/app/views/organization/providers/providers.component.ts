import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { ActionService } from "src/app/shared/services/action.service";

@Component({
    selector: "app-providers",
    templateUrl: "./providers.component.html",
    styleUrls: ["./providers.component.scss"],
})
export class ProvidersComponent implements OnInit, OnDestroy {
    subscriptions = new Subscription();
    form: FormGroup;

    consumers: any[] = [];
    providers: any[] = [];
    userDetails: any = {};
    editSection: boolean = false;

    constructor(
        public service: ActionService,
        private formBuilder: FormBuilder,
        private toaster: ToastrService
    ) {}

    ngOnInit(): void {
        this.userDetails = JSON.parse(this.service.getLS("user-details"));
        this.getConsumers();
        // this.getProviders();
    }

    initForm(data: any): void {
        this.form = this.formBuilder.group({
            id: [data.id, Validators.compose([])],
            name: [data.name, Validators.compose([Validators.required])],
            address: [data.address, Validators.compose([Validators.required])],
            contactNumber: [
                data.contactNumber,
                Validators.compose([Validators.required]),
            ],
            contactPerson: [
                data.contactPerson,
                Validators.compose([Validators.required]),
            ],
            location: [
                data.location,
                Validators.compose([Validators.required]),
            ],
            verified: [
                data.verified,
                Validators.compose([Validators.required]),
            ],
            createdDate: [
                data.createdDate,
                Validators.compose([Validators.required]),
            ],
        });
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

    edit(): void {
        this.editSection = true;
        this.initForm(this.userDetails);
    }

    cancel(): void {
        this.editSection = false;
    }

    update(): void {
        if (this.form.valid) {
            this.subscriptions.add(
                this.service.updateProvider(this.form.value).subscribe(
                    (res: any) => {
                        this.toaster.success(
                            "Successfully updated provider details.",
                            "Successful!"
                        );
                        this.userDetails = this.form.value;
                        this.service.setLS(
                            "user-details",
                            JSON.stringify(this.form.value)
                        );
                        this.editSection = false;
                    },
                    (error: any) => {
                        debugger;
                    }
                )
            );
        } else {
            this.toaster.error("Entered data is not valid!", "Error!");
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}