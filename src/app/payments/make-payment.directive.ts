import {Directive, HostListener, Input, OnInit} from '@angular/core';
import {DbService} from '../core/db/db.service';
import {environment} from '../../environments/environment';
import {NotificationService} from '../core/notifications/notification.service';
import {MatDialog} from '@angular/material';
import {PaymentConfirmationComponent} from './payment-confirmation/payment-confirmation.component';
import {CartService} from './cart/cart.service';
import {Router} from '@angular/router';
import {AddressDialogComponent} from './address/address.component';
import {ICart} from './payment.module';

@Directive({
  selector: '[appMakePayment]'
})
export class MakePaymentDirective implements OnInit {
  handler: any;
  address: any;
  @Input('price') price: number;
  @Input('email') email: string;
  @Input('userId') userId: string;

  constructor(private _notify: NotificationService,
              private _dialog: MatDialog,
              private _db: DbService,
              private _cart: CartService,
              private _router: Router) {
  }

  ngOnInit() {
    this.handler = StripeCheckout.configure({
      key: environment.stripeKey,
      image: 'assets/logo/SmallBearStampPOS_Small.png',
      locale: 'auto',
      token: token => {
        let cart = <ICart> {
          total: this.price,
          items: this._cart.list().ToArray()
        };
        this._db.store({token: token, address: this.address, cart: cart, uid: this.userId},
          `/payments/${this.userId}/${token.id}`);

        this._cart.reset();
        this._router.navigateByUrl('/');
        let tok = token.id.replace('tok_', '');
        let dialog = this._dialog.open(PaymentConfirmationComponent,
          {data: {token: tok, email: this.email}});
      }
    });
  }

  handlePayment() {
    this.handler.open({
      name: 'Small Bear',
      email: this.email,
      amount: this.price * 100
    });

  }

  @HostListener('click')
  onClick() {
    this._dialog.open(AddressDialogComponent,
      {width: '550px', disableClose: true})
      .afterClosed().subscribe(result => {
      this.address = result;
      this.handlePayment();
    });
  }

  @HostListener('window:popstate')
  popState() {
    this.handler.close();
  }
}
