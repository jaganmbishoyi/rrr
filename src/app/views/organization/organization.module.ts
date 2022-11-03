import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { OrganizationRoutingModule } from "./organization-routing.module";
import { ProvidersComponent } from "./providers/providers.component";
import { ConsumersComponent } from "./consumers/consumers.component";
import { SharedComponentModule } from "src/app/shared/components/shared-component.module";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IndividualComponent } from "./individual/individual.component";

@NgModule({
    declarations: [ProvidersComponent, ConsumersComponent, IndividualComponent],
    imports: [
        CommonModule,
        OrganizationRoutingModule,
        SharedComponentModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class OrganizationModule {}
