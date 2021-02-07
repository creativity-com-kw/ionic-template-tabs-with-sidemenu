import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Reset } from 'src/app/store/actions/auth.action';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private store: Store,
    private navController: NavController
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) { // Auto logout if 401 response returned from api
        this.store.dispatch(new Reset());
        this.navController.navigateRoot(['/login']);
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
