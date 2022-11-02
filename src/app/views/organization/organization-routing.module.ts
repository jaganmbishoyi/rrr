import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ConsumersComponent } from "./consumers/consumers.component";
import { ProvidersComponent } from "./providers/providers.component";

const routes: Routes = [
    { path: "providers", component: ProvidersComponent },
    { path: "consumers", component: ConsumersComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OrganizationRoutingModule {}
