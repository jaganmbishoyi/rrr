import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PublicLayoutComponent } from "./public-layout/public-layout.component";
import { OrgLayoutComponent } from "./org-layout/org-layout.component";
import { AdminLayoutComponent } from "./admin-layout/admin-layout.component";
import { PublicHeaderComponent } from "./public-layout/public-header/public-header.component";
import { PublicFooterComponent } from "./public-layout/public-footer/public-footer.component";
import { AdminFooterComponent } from "./admin-layout/admin-footer/admin-footer.component";
import { AdminHeaderComponent } from "./admin-layout/admin-header/admin-header.component";
import { OrgHeaderComponent } from "./org-layout/org-header/org-header.component";
import { OrgFooterComponent } from "./org-layout/org-footer/org-footer.component";
import { RouterModule } from "@angular/router";

const components = [
    PublicLayoutComponent,
    OrgLayoutComponent,
    AdminLayoutComponent,
    PublicHeaderComponent,
    PublicFooterComponent,
    AdminFooterComponent,
    AdminHeaderComponent,
    OrgHeaderComponent,
    OrgFooterComponent,
];

@NgModule({
    declarations: components,
    imports: [CommonModule, RouterModule],
    exports: components,
})
export class LayoutsModule {}
