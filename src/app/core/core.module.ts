import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FlexGridDirective} from './flexGrid/flex-grid.directive';
import {DialogLogin, LoginComponent} from './auth/login/login.component';
import {LoadingComponent} from './loading/loading.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {environment} from '../../environments/environment';
import {AuthService} from './auth/auth.service';
import {NotificationService} from './notifications/notification.service';
import {CacheService} from './cache/cache.service';
import {DbService} from './db/db.service';
import {MaterialModule} from '../app.material';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  declarations: [
    FlexGridDirective,
    LoginComponent,
    DialogLogin,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MaterialModule
  ],
  providers: [
    AuthService,
    NotificationService,
    CacheService,
    DbService
  ],
  exports: [
    FlexGridDirective,
    LoadingComponent,
    DialogLogin,
    LoginComponent
  ],
  entryComponents: [DialogLogin]
})
export class CoreModule { }
