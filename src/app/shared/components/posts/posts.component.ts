import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ActionService } from "../../services/action.service";

@Component({
    selector: "app-posts",
    templateUrl: "./posts.component.html",
    styleUrls: ["./posts.component.scss"],
})
export class PostsComponent implements OnInit, OnDestroy {
    subscriptions = new Subscription();
    portal: "individual" | "provider";
    userDetails: any = {};
    posts: any[] = [];

    constructor(public router: Router, public service: ActionService) {}

    ngOnInit(): void {
        this.userDetails = JSON.parse(this.service.getLS("user-details"));

        if (this.router && this.router.url.includes("individual")) {
            this.portal = "individual";
        }

        if (this.router && this.router.url.includes("providers")) {
            this.portal = "provider";
        }

        this.getPosts();
    }

    getPosts(): void {
        if (!this.portal) {
            this.getAllPostsConsumer();
        } else {
            this.getAllPosts();
        }
    }

    getAllPostsConsumer(): void {
        this.subscriptions.add(
            this.service.getAllPosts().subscribe((res: any) => {
                this.posts = res;
            })
        );
    }

    getAllPosts(): void {
        switch (this.portal) {
            case "provider":
                {
                    this.subscriptions.add(
                        this.service
                            .getProvidersPostSByProvidersID(this.userDetails.id)
                            .subscribe((res: any) => {
                                this.posts = res;
                            })
                    );
                }
                break;
            case "individual":
                {
                    this.subscriptions.add(
                        this.service
                            .getIndividualPostByUserID(this.userDetails.id)
                            .subscribe((res: any) => {
                                this.posts = res;
                            })
                    );
                }
                break;
        }
    }

    back(): void {
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
