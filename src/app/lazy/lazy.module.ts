import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminPageComponent} from './admin-page/admin-page.component';
import {RouterModule, Routes} from '@angular/router';
import {AdminGuard} from '../admin-guard';
import {MaterialModule} from '../app.material';
import {IAddress, ICart} from '../payments/payment.module';
import {TokenComponent} from './token/token.component';
import {CartComponent} from './cart/cart.component';
import {AddressComponent} from './address/address.component';
import {FlexLayoutModule} from '@angular/flex-layout';

const routes: Routes = [
  {path: `admin-page`, component: AdminPageComponent, canActivate: [AdminGuard], canLoad: [AdminGuard]}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [AdminPageComponent, TokenComponent, CartComponent, AddressComponent]
})
export class LazyModule {
}

export interface IToken {
  address: IAddress;
  cart: ICart;
  uid: string;
  token: any;
  charge: any;
}
