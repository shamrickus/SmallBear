import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CartComponent} from './cart.component';
import {MaterialModule} from '../../app.material';
import {CartService} from './cart.service';
import {NotificationService} from '../../core/notifications/notification.service';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {CacheService} from '../../core/cache/cache.service';
import {AuthService} from '../../core/auth/auth.service';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../../../environments/environment';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {RouterTestingModule} from '@angular/router/testing';
import {EventEmitter} from '@angular/core';
import {IProductAggregate, PaymentModule} from '../payment.module';
import {List} from 'linqts';
import {CartDirective, CartReviewDirective} from './cart.directive';
import {MakePaymentDirective} from "../make-payment.directive";
import {DbService} from "../../core/db/db.service";

let authStub = {
  authChange: new EventEmitter()
};

class CartStub {
  list() {
    return new List<IProductAggregate>();
  }

  get(data) {
    return data;
  }

  total() {
    return 0;
  }

  count() {
    return 0;
  }
}

let cartStub = new CartStub();

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CartComponent, CartDirective, MakePaymentDirective, CartReviewDirective],
      imports: [
        MaterialModule,
        SimpleNotificationsModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        {provide: CartService, useValue: cartStub},
        {provide: AuthService, useValue: authStub},
        NotificationService,
        {provide: CacheService, useValue: {}},
        {provide: DbService, useValue: {}}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    window["StripeCheckout"] = {
      configure(env) {}
    };
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
