import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { OrganizationRoutingModule } from "./organization-routing.module";
import { ProvidersComponent } from "./providers/providers.component";
import { ConsumersComponent } from "./consumers/consumers.component";
import { SharedComponentModule } from "src/app/shared/components/shared-component.module";

@NgModule({
    declarations: [ProvidersComponent, ConsumersComponent],
    imports: [CommonModule, OrganizationRoutingModule, SharedComponentModule],
})
export class OrganizationModule {}
