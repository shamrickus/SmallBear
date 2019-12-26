import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenComponent } from './token.component';
import {MaterialModule} from "../../app.material";
import {FlexLayoutModule} from "@angular/flex-layout";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CartComponent} from "../cart/cart.component";
import {AddressComponent} from "../address/address.component";
import {DbService} from "../../core/db/db.service";
import {NotificationService} from "../../core/notifications/notification.service";
import {IToken} from "../lazy.module";

describe('TokenComponent', () => {
  let component: TokenComponent;
  let fixture: ComponentFixture<TokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenComponent, CartComponent, AddressComponent ],
      imports: [
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        {provide: DbService, useValue: {}},
        {provide: NotificationService, useValue: {}},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenComponent);
    component = fixture.componentInstance;
    component.token = <IToken> {
      address: {},
      cart: {},
      charge: "",
      token: "",
      uid: ""
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
