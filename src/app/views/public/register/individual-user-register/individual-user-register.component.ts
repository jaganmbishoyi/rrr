import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { ActionService } from "src/app/shared/services/action.service";
@Component({
    selector: "app-individual-user-register",
    templateUrl: "./individual-user-register.component.html",
    styleUrls: ["./individual-user-register.component.scss"],
})
export class IndividualUserRegisterComponent implements OnInit, OnDestroy {
    form: FormGroup;
    subscriptions = new Subscription();

    constructor(
        private formBuilder: FormBuilder,
        private toaster: ToastrService,
        private router: Router,
        public service: ActionService
    ) {}

    ngOnInit(): void {
        this.initForm();
    }

    initForm(): void {
        this.form = this.formBuilder.group({
            id: [0, Validators.compose([])],
            firstName: ["", Validators.compose([Validators.required])],
            lastName: ["", Validators.compose([Validators.required])],
            email: ["", Validators.compose([Validators.required])],
            phoneNumber: ["", Validators.compose([Validators.required])],
            address: ["", Validators.compose([Validators.required])],
            password: ["", Validators.compose([Validators.required])],
            createdDate: [
                new Date(),
                Validators.compose([Validators.required]),
            ],
            updatedDate: [new Date()],
        });
    }

    register(): void {
        if (this.form.valid) {
            this.subscriptions.add(
                this.service
                    .registerIndividualUser(this.form.value)
                    .subscribe((res: any) => {
                        this.toaster.success(
                            "Successfully registered as Individual  user.",
                            "Successful!"
                        );

                        this.router.navigate(["/login"]);
                    })
            );
        } else {
            this.toaster.error("Entered data is not valid!", "Error!");
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
