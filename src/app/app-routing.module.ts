import { NgModule } from "@angular/core";
import { ExtraOptions, RouterModule, Routes } from "@angular/router";
import { OrgLayoutComponent } from "./shared/layouts/org-layout/org-layout.component";
import { PublicLayoutComponent } from "./shared/layouts/public-layout/public-layout.component";

const APP_ROUTES: Routes = [
    {
        path: "",
        component: PublicLayoutComponent,
        loadChildren: () =>
            import("./views/public/public.module").then((m) => m.PublicModule),
    },
    {
        path: "organization",
        component: OrgLayoutComponent,
        loadChildren: () =>
            import("./views/organization/organization.module").then(
                (m) => m.OrganizationModule
            ),
    },
    {
        path: "**",
        redirectTo: "/page-not-found",
    },
];

const routerOptions: ExtraOptions = {
    scrollPositionRestoration: "top",
    onSameUrlNavigation: "ignore",
};

@NgModule({
    imports: [RouterModule.forRoot(APP_ROUTES, routerOptions)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
