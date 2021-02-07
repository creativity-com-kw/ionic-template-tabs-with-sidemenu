import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState } from 'src/app/store/states/auth.state';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {

  constructor(private store: Store) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.store.selectSnapshot(AuthState.token);

    if (token) {
      request = request.clone({
        setHeaders: {
          'Auth-Token': `Bearer ${token}`
        }
      });
    }

    return next.handle(request);
  }

}
