import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CreateEditPostComponent } from "src/app/shared/components/posts/create-edit-post/create-edit-post.component";
import { PostsComponent } from "src/app/shared/components/posts/posts.component";
import { ConsumersComponent } from "./consumers/consumers.component";
import { IndividualComponent } from "./individual/individual.component";
import { ProvidersComponent } from "./providers/providers.component";

const routes: Routes = [
    { path: "providers", component: ProvidersComponent },
    { path: "consumers", component: ConsumersComponent },
    { path: "individual", component: IndividualComponent },
    { path: "individual/posts", component: PostsComponent },
    { path: "individual/posts/:ID", component: CreateEditPostComponent },
    { path: "providers/posts", component: PostsComponent },
    { path: "providers/posts/:ID", component: CreateEditPostComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OrganizationRoutingModule {}
