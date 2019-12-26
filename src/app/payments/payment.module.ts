import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaymentService} from './payment.service';
import {CartService} from './cart/cart.service';
import {CartDirective, CartDisplayDirective, CartReviewDirective} from './cart/cart.directive';
import {CartComponent} from './cart/cart.component';
import {MaterialModule} from '../app.material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MakePaymentDirective} from './make-payment.directive';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../../environments/environment';
import {PaymentConfirmationComponent} from './payment-confirmation/payment-confirmation.component';
import {AddressComponent, AddressDialogComponent} from './address/address.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule
  ],
  declarations: [
    CartDirective,
    CartDisplayDirective,
    CartReviewDirective,
    CartComponent,
    MakePaymentDirective,
    AddressComponent,
    AddressDialogComponent,
    PaymentConfirmationComponent
  ],
  providers: [
    PaymentService,
    CartService
  ],
  exports: [
    CartDirective,
    CartDisplayDirective,
    CartReviewDirective
  ],
  entryComponents: [PaymentConfirmationComponent, AddressDialogComponent]

})
export class PaymentModule {
}

export interface IProduct {
  price: number;
  name: string;
  notes?: string;
  roast?: string;
  origin?: string;
  id: string;
  qty: string;
}

export interface ICart {
  items: IProductAggregate[];
  total: number;
}

export interface IProductAggregate {
  item: IProduct;
  count: number;
}

export interface Map<T> {
  [K: string]: T;
}

export interface IAddress {
  city: string;
  state: string;
  street: string;
  zip: string;
}
