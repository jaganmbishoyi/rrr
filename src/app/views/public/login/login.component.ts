import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { ActionService } from "src/app/shared/services/action.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
    form: FormGroup;
    subscriptions = new Subscription();

    loginTypes = [
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

    selectedLoginType: string = "Provider";

    selectLoginType(type: string): void {
        this.selectedLoginType = type;
    }

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
            mobileNumber: ["", Validators.compose([])],
            password: ["", Validators.compose([Validators.required])],
        });
    }

    login(): void {
        if (this.form.valid) {
            switch (this.selectedLoginType) {
                case "Provider":
                    {
                        this.subscriptions.add(
                            this.service
                                .providerLogin(this.form.value)
                                .subscribe(
                                    (res: any) => {
                                        this.service.setLS(
                                            "user-details",
                                            JSON.stringify(res)
                                        );
                                        this.toaster.success(
                                            "Login Successful",
                                            "Successful!"
                                        );
                                        this.router.navigate([
                                            "/organization/providers",
                                        ]);
                                    },
                                    (error: any) => {
                                        this.toaster.error(
                                            "Wrong credentials!",
                                            "Error!"
                                        );
                                    }
                                )
                        );
                    }
                    break;

                case "Consumer":
                    {
                        this.subscriptions.add(
                            this.service
                                .consumerLogin(this.form.value)
                                .subscribe(
                                    (res: any) => {
                                        this.service.setLS(
                                            "user-details",
                                            JSON.stringify(res)
                                        );
                                        this.toaster.success(
                                            "Login Successful",
                                            "Successful!"
                                        );
                                        this.router.navigate([
                                            "/organization/consumers",
                                        ]);
                                    },
                                    (error: any) => {
                                        this.toaster.error(
                                            "Wrong credentials!",
                                            "Error!"
                                        );
                                    }
                                )
                        );
                    }
                    break;

                default:
                    break;
            }
        } else {
            this.toaster.error("Entered data is not valid!", "Error!");
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
