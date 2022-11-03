import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PublicRoutingModule } from "./public-routing.module";
import { PublicComponent } from "./public.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { ProviderRegisterComponent } from "./register/provider-register/provider-register.component";
import { ConsumerRegisterComponent } from "./register/consumer-register/consumer-register.component";
import { IndividualUserRegisterComponent } from "./register/individual-user-register/individual-user-register.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { SharedComponentModule } from "src/app/shared/components/shared-component.module";

@NgModule({
    declarations: [
        PublicComponent,
        PageNotFoundComponent,
        HomeComponent,
        RegisterComponent,
        LoginComponent,
        ProviderRegisterComponent,
        ConsumerRegisterComponent,
        IndividualUserRegisterComponent,
    ],
    imports: [
        CommonModule,
        PublicRoutingModule,
        SharedComponentModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class PublicModule {}
