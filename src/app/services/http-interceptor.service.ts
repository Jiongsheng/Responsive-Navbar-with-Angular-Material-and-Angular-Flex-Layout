import { Injectable } from "@angular/core";
import { HttpEvent, HttpRequest, HttpHandler, HttpInterceptor } from "@angular/common/http";

import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const clonedRequest = req.clone({
      headers: req.headers.set("X-CustomAuthHeader", "iloveangular")
    });
    console.log("new headers", clonedRequest.headers.keys());
    return next.handle(clonedRequest);
  }
}
