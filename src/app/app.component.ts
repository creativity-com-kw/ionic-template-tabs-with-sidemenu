import { Component } from '@angular/core';
import { MobileAccessibility } from '@ionic-native/mobile-accessibility/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appPages = [
    { title: 'Home', url: '/tabs/tab1', icon: 'home' },
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private mobileAccessibility: MobileAccessibility
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is('hybrid')) {
        this.splashScreen.hide();

        // StatusBar
        if (this.platform.is('android')) {
          this.statusBar.overlaysWebView(false);
          this.statusBar.styleDefault();
          this.statusBar.backgroundColorByHexString('#FFFFFF');
        } else {
          this.statusBar.overlaysWebView(true);
          this.statusBar.styleDefault();
          this.statusBar.backgroundColorByHexString('#FFFFFF');
        }

        // Accessibility
        if (this.mobileAccessibility) {
          this.mobileAccessibility.usePreferredTextZoom(false);
        }
      }
    });
  }
}
