import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { MobileAccessibility } from '@ionic-native/mobile-accessibility/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { TranslateModule } from '@ngx-translate/core';
import { CalendarModule } from 'ion2-calendar'; // npm install ion2-calendar@next moment --save
import { LazyLoadImageModule } from 'ng-lazyload-image'; // https://github.com/tjoskar/ng-lazyload-image
import { ErrorInterceptor } from './helpers/error.interceptor';
import { JWTInterceptor } from './helpers/jwt.interceptor';
import { DateFormat } from './pipes/date-format.pipe';

@NgModule({
  declarations: [DateFormat],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    CalendarModule,
    LazyLoadImageModule
  ],
  providers: [
    InAppBrowser,
    MobileAccessibility,
    OneSignal,
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  exports: [
    ReactiveFormsModule,
    TranslateModule,
    CalendarModule,
    LazyLoadImageModule,
    DateFormat
  ]
})
export class SharedModule { }
