import {EventEmitter, Injectable, Output} from '@angular/core';
import {NotificationService} from '../../core/notifications/notification.service';
import {IProduct, IProductAggregate} from '../payment.module';
import {CacheService} from '../../core/cache/cache.service';
import {Map} from '../../app.module';
import {AuthService} from '../../core/auth/auth.service';
import {List} from 'linqts';

export interface ICartService {
  cart: Map<IProductAggregate>;
  change: EventEmitter<any>;

  reset(): void;

  addCollection(collection: IProductAggregate): void;

  add(product: IProduct, update: boolean): void;

  remove(product: IProduct, all: boolean): void;

  get(key: string): IProductAggregate;

  count(): number;

  list(): List<IProductAggregate>;

  total(): number;
}

@Injectable()
export class CartService implements ICartService {
  cart: Map<IProductAggregate>;
  @Output() change: EventEmitter<any> = new EventEmitter();

  constructor(private _notification: NotificationService, private _storage: CacheService, private _auth: AuthService) {
    this.cart = {};

    for (let value of this._storage.list().ToArray()) {
      this.addCollection(value);
    }
    let first = true;
    this._auth.authChange.subscribe((auth) => {
      if (auth === null && !first) {
        this.reset();
      }
      first = false;
    });
  }

  reset() {
    this.cart = {};
    this._storage.clear();
    this.change.emit({});
  }

  private keys(): List<string> {
    return new List<string>(Object.keys(this.cart));
  }

  private values(): List<IProductAggregate> {
    return this.keys().Select(x => this.cart[x]);
  }

  addCollection(collection: IProductAggregate) {
    this.cart[collection.item.id] = collection;

    this._storage.store(collection.item.id, collection);

    this.change.emit(collection.item);
  }

  add(product: IProduct, update: boolean = true) {
    if (this.keys().Contains(product.id.toString())) {
      this.cart[product.id].count++;
    }
    else {
      this.cart[product.id] = {
        count: 1,
        item: product
      };
    }

    if (update)
      this._storage.store(product.id, this.cart[product.id]);

    this.change.emit(product);
  }

  remove(product: IProduct, all: boolean = false) {
    if (this.keys().Contains(product.id.toString())) {
      if (all) {
        delete this.cart[product.id];
        this._storage.delete(product.id);
      }
      else {
        let prod = this.cart[product.id];
        if (prod.count <= 1) {
          this.remove(product, true);
        }
        else {
          prod.count--;
          this._storage.store(prod.item.id, prod);
        }
      }
    }

    this.change.emit(product);
  }

  get(key: string): IProductAggregate {
    return this.values().FirstOrDefault(x => x.item.id == key);
  }

  count(): number {
    return this.values().Sum(x => x.count);
  }

  list(): List<IProductAggregate> {
    return this.values();
  }

  total(): number {
    return this.values().Sum(x => x.item.price * x.count);
  }

}
