import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LayoutsModule } from "./layouts/layouts.module";

@NgModule({
    declarations: [],
    imports: [CommonModule, LayoutsModule],
    exports: [LayoutsModule],
})
export class SharedModule {}
