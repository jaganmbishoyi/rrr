import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { SharedModule } from "./shared/shared.module";
import { AppRoutingModule } from "./app-routing.module";
import { ToastrModule } from "ngx-toastr";
import { NgHttpLoaderModule } from "ng-http-loader";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpConfigInterceptor } from "./shared/services/interceptor/httpconfig.interceptor";

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        SharedModule,
        AppRoutingModule,
        NgHttpLoaderModule.forRoot(),
        ToastrModule.forRoot({
            timeOut: 5000,
            positionClass: "toast-top-right",
            preventDuplicates: true,
            closeButton: true,
            autoDismiss: false,
        }),
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpConfigInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
