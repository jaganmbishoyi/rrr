import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { ActionService } from "src/app/shared/services/action.service";

@Component({
    selector: "app-create-edit-post",
    templateUrl: "./create-edit-post.component.html",
    styleUrls: ["./create-edit-post.component.scss"],
})
export class CreateEditPostComponent implements OnInit, OnDestroy {
    subscriptions = new Subscription();
    form: FormGroup;
    portal: "individual" | "provider";
    userDetails: any = {};
    postID: any;
    editSection: boolean = false;

    constructor(
        public service: ActionService,
        private formBuilder: FormBuilder,
        public activatedRoute: ActivatedRoute,
        private router: Router,
        private toaster: ToastrService
    ) {
        this.initForm();
    }

    ngOnInit(): void {
        this.userDetails = JSON.parse(this.service.getLS("user-details"));

        if (this.router && this.router.url.includes("individual")) {
            this.portal = "individual";
        }

        if (this.router && this.router.url.includes("providers")) {
            this.portal = "provider";
        }

        this.activatedRoute.params.subscribe((routeParams) => {
            if (routeParams && routeParams.ID) {
                this.postID = routeParams.ID;
                if (this.postID === "new") {
                    this.editSection = true;
                    this.initForm();
                } else {
                    this.getPostById();
                }
            }
        });
    }

    getPostById(): void {
        switch (this.portal) {
            case "provider":
                {
                    this.subscriptions.add(
                        this.service
                            .getProvidersPostByID(this.postID)
                            .subscribe((res: any) => {
                                this.initForm(res);
                            })
                    );
                }
                break;
            case "individual":
                {
                    this.subscriptions.add(
                        this.service
                            .getIndividualPostByID(this.postID)
                            .subscribe((res: any) => {
                                this.initForm(res);
                            })
                    );
                }
                break;
        }
    }

    initForm(data?: any): void {
        this.form = this.formBuilder.group({
            id: [data && data.id ? data.id : 0],
            name: [
                data && data.name ? data.name : "",
                Validators.compose([Validators.required]),
            ],
            type: [
                data && data.type ? data.type : this.portal,
                Validators.compose([Validators.required]),
            ],
            expiryDate: [
                data && data.expiryDate ? data.expiryDate : new Date(),
                Validators.compose([Validators.required]),
            ],
            location: [
                data && data.location ? data.location : "",
                Validators.compose([Validators.required]),
            ],
            category: [
                data && data.category ? data.category : "Food",
                Validators.compose([Validators.required]),
            ],
            address: [
                data && data.address ? data.address : "",
                Validators.compose([Validators.required]),
            ],
            addressType: [
                data && data.addressType ? data.addressType : "Home",
                Validators.compose([Validators.required]),
            ],
            contactNumber: [
                data && data.contactNumber ? data.contactNumber : "",
                Validators.compose([Validators.required]),
            ],
            contactName: [
                data && data.contactName ? data.contactName : "",
                Validators.compose([Validators.required]),
            ],
            createdBy: [
                data && data.createdBy ? data.createdBy : this.userDetails.id,
                Validators.compose([Validators.required]),
            ],
            status: [
                data && data.status ? data.status : "open",
                Validators.compose([Validators.required]),
            ],
            consumerID: [data && data.consumerID ? data.consumerID : ""],
            notes: [
                data && data.notes ? data.notes : "",
                Validators.compose([Validators.required]),
            ],
            updatedDate: [
                data && data.updatedDate ? data.updatedDate : new Date(),
                Validators.compose([Validators.required]),
            ],
            createdDate: [
                data && data.createdDate ? data.createdDate : new Date(),
                Validators.compose([Validators.required]),
            ],
        });
    }

    edit(): void {
        this.editSection = true;
    }

    createPost(): void {
        switch (this.portal) {
            case "provider":
                {
                    if (this.form.valid) {
                        const data = this.form.value;
                        data.providerId = this.userDetails.id;

                        this.subscriptions.add(
                            this.service
                                .createProvidersPost(this.form.value)
                                .subscribe((res: any) => {
                                    this.toaster.success(
                                        "Post created Successfully",
                                        "Error!"
                                    );
                                    this.cancel();
                                })
                        );
                    } else {
                        this.toaster.error(
                            "Entered data is not valid!",
                            "Error!"
                        );
                    }
                }
                break;
            case "individual":
                {
                    if (this.form.valid) {
                        const data = this.form.value;
                        data.publicUserId = this.userDetails.id;

                        this.subscriptions.add(
                            this.service
                                .createIndividualPost(this.form.value)
                                .subscribe((res: any) => {
                                    this.toaster.success(
                                        "Post created Successfully",
                                        "Error!"
                                    );
                                    this.cancel();
                                })
                        );
                    } else {
                        this.toaster.error(
                            "Entered data is not valid!",
                            "Error!"
                        );
                    }
                }
                break;
        }
    }

    updatePost(): void {
        switch (this.portal) {
            case "provider":
                {
                    if (this.form.valid) {
                        this.subscriptions.add(
                            this.service
                                .updateProvidersPost(this.form.value)
                                .subscribe((res: any) => {
                                    this.toaster.success(
                                        "Post updated Successfully",
                                        "Error!"
                                    );
                                    this.cancel();
                                })
                        );
                    } else {
                        this.toaster.error(
                            "Entered data is not valid!",
                            "Error!"
                        );
                    }
                }
                break;
            case "individual":
                {
                    if (this.form.valid) {
                        this.subscriptions.add(
                            this.service
                                .updateIndividualPost(this.form.value)
                                .subscribe((res: any) => {
                                    this.toaster.success(
                                        "Post updated Successfully",
                                        "Error!"
                                    );
                                    this.cancel();
                                })
                        );
                    } else {
                        this.toaster.error(
                            "Entered data is not valid!",
                            "Error!"
                        );
                    }
                }
                break;
        }
    }

    cancel(): void {
        switch (this.portal) {
            case "provider":
                this.router.navigate(["/organization/providers"]);
                break;
            case "individual":
                this.router.navigate(["/organization/individual"]);
                break;
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
