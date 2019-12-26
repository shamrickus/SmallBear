import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageComponent } from './admin-page.component';
import {MaterialModule} from "../../app.material";
import {FlexLayoutModule} from "@angular/flex-layout";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TokenComponent} from "../token/token.component";
import {AddressComponent} from "../address/address.component";
import {CartComponent} from "../cart/cart.component";
import {DbService} from "../../core/db/db.service";
import {Observable} from "rxjs";

describe('AdminPageComponent', () => {
  let component: AdminPageComponent;
  let fixture: ComponentFixture<AdminPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPageComponent, TokenComponent, AddressComponent, CartComponent ],
      imports: [
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        {provide: DbService, useValue: { list() { return new Observable<any>() } }}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
