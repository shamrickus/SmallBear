import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HomeComponent, PrivComponent, ToSComponent} from './pages/home/home.component';
import {AppRouterModule} from './app.routers';
import {MaterialModule} from './app.material';
import {StoreComponent} from './pages/store/store.component';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {PaymentModule} from './payments/payment.module';
import {CoreModule} from './core/core.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AdminGuard} from './admin-guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StoreComponent,
    PrivComponent,
    ToSComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    AppRouterModule,
    FlexLayoutModule,
    PaymentModule,
    SimpleNotificationsModule.forRoot()
  ],
  providers: [AdminGuard],
  entryComponents: [PrivComponent, ToSComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export interface Map<T> {
  [K: string]: T;
}
