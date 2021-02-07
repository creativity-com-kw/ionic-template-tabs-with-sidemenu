import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { NavController, Platform } from '@ionic/angular';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { SetIsNotificationTapped } from '../store/actions/app.action';
import { Login, Logout } from '../store/actions/auth.action';
import { AuthState } from '../store/states/auth.state';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  private jwtHelperService: any;

  constructor(
    private store: Store,
    private platform: Platform,
    private router: Router,
    private navController: NavController,
    private oneSignal: OneSignal,
    private actions$: Actions
  ) {
    this.jwtHelperService = new JwtHelperService();
  }

  init() {
    if (this.platform.is('hybrid')) {
      if (!environment.production) {
        this.oneSignal.setLogLevel({
          logLevel: 4,
          visualLevel: 4
        });
      }

      this.oneSignal.startInit(environment.onesignal_app_id);

      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

      this.oneSignal.iOSSettings({
        kOSSettingsKeyAutoPrompt: false,
        kOSSettingsKeyInAppLaunchURL: false
      });

      this.oneSignal.handleNotificationReceived().subscribe((value) => {
        // do something when notification is received

      });

      this.oneSignal.handleNotificationOpened().subscribe((value) => {
        // do something when a notification is opened
        if (this.router.url === '/') {
          this.store.dispatch(new SetIsNotificationTapped(true));
        } else {
          if (this.router.isActive('/notifications', true)) {

          } else {
            setTimeout(() => {
              this.navController.navigateForward(['/notifications']);
            }, 250);
          }
        }

      });

      this.oneSignal.endInit();

      // Register For Push Notifications iOS
      if (this.platform.is('iphone')) {
        this.oneSignal.registerForPushNotifications();
        this.oneSignal.setSubscription(true);
      }

      // Set/Remove external user id
      if (this.store.selectSnapshot(AuthState.isAuthenticated)) {
        const user = this.store.selectSnapshot(AuthState.user);
        this.oneSignal.setExternalUserId(user.id);
      } else {
        this.oneSignal.removeExternalUserId();
      }

      // Handle actions to set/unset external id
      this.actions$.pipe(ofActionSuccessful(Login)).subscribe((data) => {
        const decodedToken = this.jwtHelperService.decodeToken(data.jwt);
        this.oneSignal.setExternalUserId(decodedToken.user.id);
      });

      this.actions$.pipe(ofActionSuccessful(Logout)).subscribe((data) => {
        this.oneSignal.removeExternalUserId();
      });

    }

  }

}
