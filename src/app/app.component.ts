import { Component } from '@angular/core';
import { MobileAccessibility } from '@ionic-native/mobile-accessibility/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { TranslateCacheService } from 'ngx-translate-cache';
import { SetLanguage } from './store/actions/app.action';
import { AppState } from './store/states/app.state';

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
    private store: Store,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private mobileAccessibility: MobileAccessibility,
    private translateService: TranslateService,
    private translateCacheService: TranslateCacheService,
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

      // Init translate cache service
      this.initTranslateCacheService();
    });
  }

  initTranslateCacheService() {
    localStorage.setItem('lang', this.store.selectSnapshot(AppState.language));
    this.translateCacheService.init();

    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.store.dispatch(new SetLanguage(event.lang));

      setTimeout(() => {
        document.getElementsByTagName('html')[0].setAttribute('lang', event.lang);
        document.getElementsByTagName('html')[0].setAttribute('dir', event.lang === 'en' ? 'ltr' : 'rtl');
      }, 800);
    });
  }

}
