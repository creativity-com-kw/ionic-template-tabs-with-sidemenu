import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { MobileAccessibility } from '@ionic-native/mobile-accessibility/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { TranslateCacheModule, TranslateCacheService, TranslateCacheSettings } from 'ngx-translate-cache';
import { NgxsResetPluginModule } from 'ngxs-reset-plugin'; // https://github.com/ng-turkey/ngxs-reset-plugin
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared.module';
import { AppState } from './store/states/app.state';
import { AuthState } from './store/states/auth.state';

// ngx-translate
export function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function TranslateCacheFactory(translateService, translateCacheSettings) {
  return new TranslateCacheService(translateService, translateCacheSettings);
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot({
      mode: 'md'
    }),
    AppRoutingModule,
    NgxsModule.forRoot([
      AuthState,
      AppState
    ], { developmentMode: !environment.production }),
    NgxsStoragePluginModule.forRoot({
      key: ['auth', 'app']
    }),
    NgxsLoggerPluginModule.forRoot({ disabled: environment.production }),
    NgxsResetPluginModule.forRoot(),
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (httpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    TranslateCacheModule.forRoot({
      cacheService: {
        provide: TranslateCacheService,
        useFactory: TranslateCacheFactory,
        deps: [TranslateService, TranslateCacheSettings]
      }
    }),
    SharedModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    StatusBar,
    SplashScreen,
    Keyboard,
    MobileAccessibility
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
