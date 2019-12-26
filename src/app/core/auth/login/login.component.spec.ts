import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {MaterialModule} from '../../../app.material';
import {AuthService} from '../auth.service';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {environment} from '../../../../environments/environment';
import {AngularFireModule} from 'angularfire2';
import {RouterTestingModule} from '@angular/router/testing';
import {NotificationService} from '../../notifications/notification.service';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {DbService} from "../../db/db.service";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [MaterialModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        RouterTestingModule.withRoutes([]),
        SimpleNotificationsModule.forRoot()
      ],
      providers: [
        AuthService,
        NotificationService,
        DbService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
