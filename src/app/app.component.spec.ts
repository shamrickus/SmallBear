import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {NotificationService} from './core/notifications/notification.service';
import {RouterTestingModule} from '@angular/router/testing';
import {LoginComponent} from './core/auth/login/login.component';
import {MaterialModule} from './app.material';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {AuthService} from './core/auth/auth.service';
import {FlexLayoutModule} from "@angular/flex-layout";
import {DbService} from "./core/db/db.service";
import {AngularFireModule} from "angularfire2";
import {environment} from "../environments/environment";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {AngularFireAuthModule} from "angularfire2/auth";
import {Router} from "@angular/router";
import {Renderer2} from "@angular/core";
import {Observable} from "rxjs";

let notificationStub = { };
let authStub = { };

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        LoginComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([]),
        MaterialModule,
        FlexLayoutModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        RouterTestingModule.withRoutes([]),
        SimpleNotificationsModule.forRoot()
      ],
      providers: [
        {provide: Router, useValue: {}},
        NotificationService,
        {provide: Renderer2, useValue: { addClass(arg) {} }},
        DbService,
        AuthService
      ]
    }).compileComponents();
  }));
/*
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  }));
*/
});
