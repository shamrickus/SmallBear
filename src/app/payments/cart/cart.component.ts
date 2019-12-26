import {Component, OnInit} from '@angular/core';
import {CartService} from './cart.service';
import {IProductAggregate} from '../payment.module';
import {cardOut} from '../../app.animations';
import {AuthService} from '../../core/auth/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [cardOut]
})
export class CartComponent implements OnInit {

  constructor(private _cart: CartService, private _auth: AuthService) {
  }

  ngOnInit() {
  }

  getEmail(): string {
    if (this._auth.authenticated)
      return this._auth.currentUserEmail;
    return null;
  }

  getUserId(): string {
    if (this._auth.authenticated)
      return this._auth.currentUserId;
    return null;
  }

  getTotal(): string {
    return this._cart.total().toString();
  }

  getList(): IProductAggregate[] {
    let data = this._cart.list();
    return data.ToArray();
  }

  getSum(product: IProductAggregate) {
    let prod = this._cart.get(product.item.id);
    if (prod)
      return prod.count * prod.item.price;
    return 0;
  }

  getCount(): number {
    return this._cart.count();
  }

  toTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  public changeState(ag) {
    ag['Deleted'] = true;
  }

  getState(ag) {
    return ag['Deleted'] == true ? 'b' : 'a';
  }
}
