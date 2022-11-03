import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { ActionService } from "src/app/shared/services/action.service";

@Component({
    selector: "app-individual",
    templateUrl: "./individual.component.html",
    styleUrls: ["./individual.component.scss"],
})
export class IndividualComponent implements OnInit, OnDestroy {
    subscriptions = new Subscription();
    form: FormGroup;

    consumers: any[] = [];
    providers: any[] = [];
    userDetails: any = {};
    editSection: boolean = false;

    constructor(
        public service: ActionService,
        private formBuilder: FormBuilder,
        private router: Router,
        private toaster: ToastrService
    ) {}

    ngOnInit(): void {
        this.userDetails = JSON.parse(this.service.getLS("user-details"));

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

    initForm(data: any): void {
        this.form = this.formBuilder.group({
            id: [data.id, Validators.compose([])],
            firstName: [
                data.firstName,
                Validators.compose([Validators.required]),
            ],
            lastName: [
                data.lastName,
                Validators.compose([Validators.required]),
            ],
            email: [data.email, Validators.compose([Validators.required])],
            phoneNumber: [
                data.phoneNumber,
                Validators.compose([Validators.required]),
            ],
            address: [data.address, Validators.compose([Validators.required])],
        });
    }

    edit(): void {
        this.editSection = true;
        this.initForm(this.userDetails);
    }

    cancel(): void {
        this.editSection = false;
    }

    createPost(): void {
        this.router.navigate(["/organization/individual/posts/new"]);
    }

    allPosts(): void {
        this.router.navigate(["/organization/individual/posts"]);
    }

    update(): void {
        if (this.form.valid) {
            this.subscriptions.add(
                this.service.updateIndividualUser(this.form.value).subscribe(
                    (res: any) => {
                        this.toaster.success(
                            "Successfully updated individual user details.",
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
