import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngxs/store';
import { ToastService } from 'src/app/providers/toast.service';
import { AuthState } from 'src/app/store/states/auth.state';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private store: Store, private toastService: ToastService) { }

  canActivate() {
    const isAuthenticated = this.store.selectSnapshot(AuthState.isAuthenticated);

    if (isAuthenticated === false) {
      this.toastService.present('Please login and try again.', 2000, false);
    }

    return isAuthenticated;
  }

}
