import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { ActionService } from "src/app/shared/services/action.service";

@Component({
    selector: "app-consumer-register",
    templateUrl: "./consumer-register.component.html",
    styleUrls: ["./consumer-register.component.scss"],
})
export class ConsumerRegisterComponent implements OnInit, OnDestroy {
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
            id: ["", Validators.compose([])],
            name: ["", Validators.compose([Validators.required])],
            address: ["", Validators.compose([Validators.required])],
            contactNo: ["", Validators.compose([Validators.required])],
            contactPerson: ["", Validators.compose([Validators.required])],
            location: ["", Validators.compose([Validators.required])],
            numberOfPersons: ["", Validators.compose([Validators.required])],
            typeId: ["orphanage", Validators.compose([Validators.required])],
            verified: [false, Validators.compose([Validators.required])],
            password: ["", Validators.compose([Validators.required])],
            otherType: [null, Validators.compose([Validators.required])],
            createdDate: [
                new Date(),
                Validators.compose([Validators.required]),
            ],
            updatedDate: [null, Validators.compose([Validators.required])],
        });
    }

    register(): void {
        if (this.form.valid) {
            this.subscriptions.add(
                this.service
                    .registerConsumer(this.form.value)
                    .subscribe((res: any) => {
                        this.toaster.success(
                            "Successfully registered as consumer.",
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
