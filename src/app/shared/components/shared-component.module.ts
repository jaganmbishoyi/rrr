import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProviderCardComponent } from "./provider-card/provider-card.component";
import { ConsumerCardComponent } from "./consumer-card/consumer-card.component";

const components = [ProviderCardComponent, ConsumerCardComponent];

@NgModule({
    declarations: components,
    imports: [CommonModule],
    exports: components,
})
export class SharedComponentModule {}
