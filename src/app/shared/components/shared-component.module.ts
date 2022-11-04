import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProviderCardComponent } from "./provider-card/provider-card.component";
import { ConsumerCardComponent } from "./consumer-card/consumer-card.component";
import { PostsComponent } from "./posts/posts.component";
import { CreateEditPostComponent } from "./posts/create-edit-post/create-edit-post.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PostCardComponent } from "./posts/post-card/post-card.component";

const components = [
    ProviderCardComponent,
    ConsumerCardComponent,
    PostsComponent,
    CreateEditPostComponent,
    PostCardComponent,
];

@NgModule({
    declarations: components,
    imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
    exports: components,
})
export class SharedComponentModule {}
