import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentConfirmationComponent } from './payment-confirmation.component';
import {MaterialModule} from "../../app.material";
import {CommonModule} from "@angular/common";
import {FlexLayoutModule} from "@angular/flex-layout";
import {AngularFireModule} from "angularfire2";
import {environment} from "../../../environments/environment";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

describe('PaymentConfirmationComponent', () => {
  let component: PaymentConfirmationComponent;
  let fixture: ComponentFixture<PaymentConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentConfirmationComponent ],
      imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule
      ]
      ,
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: []}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
