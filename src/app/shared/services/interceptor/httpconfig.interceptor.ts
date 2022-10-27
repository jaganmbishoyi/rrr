import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpHeaderResponse,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpSentEvent,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { throwError, Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(public router: Router, private toastr: ToastrService) {}

    intercept(
        request: HttpRequest<string>,
        next: HttpHandler
    ): Observable<HttpEvent<HttpSentEvent | HttpHeaderResponse>> {
        if (request.headers.get("hideLoader")) {
            request = request.clone({
                headers: request.headers.delete("hideLoader"),
            });
        }

        request = request.clone({
            headers: request.headers.set("Accept", "application/json"),
        });

        return next.handle(request).pipe(
            tap((event) => {
                if (event instanceof HttpResponse) {
                    console.log(event);
                }
            }),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 500) {
                    this.toastr.error(
                        "Something went wrong. Please try again",
                        "Error!"
                    );
                }

                if (error.status === 401) {
                    this.router.navigate(["/"]);
                }

                return throwError(error);
            })
        );
    }
}
