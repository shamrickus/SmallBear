import {AfterViewInit, Directive, ElementRef, HostListener, Input} from '@angular/core';
import {CartService} from './cart.service';
import {IProduct, IProductAggregate} from '../payment.module';
import {NotificationService} from '../../core/notifications/notification.service';

@Directive({
  selector: '[appCartDisplay]'
})
export class CartDisplayDirective {

  updateText(change: string) {
    this.el.nativeElement.innerHTML = change;
  }

  constructor(private el: ElementRef, private _cart: CartService) {
    this.updateText(`Cart (${_cart.count()})`);

    this._cart.change.subscribe(() => {
      this.updateText(`Cart (${_cart.count()})`);
    });
  }
}

@Directive({
  selector: '[appCartReview]'
})
export class CartReviewDirective {
  @Input('product') product: IProductAggregate;

  constructor(private el: ElementRef, private _cart: CartService) {
  }

  @HostListener('change')
  @HostListener('keyup')
  onChanges(): void {
    if (this.el.nativeElement.value == '') return;
    let value = +this.el.nativeElement.value;
    if (value <= 0) value = 1;
    if (value > 99) value = 99;
    if (value != null) {
      this.el.nativeElement.value = value;
      let product = this._cart.get(this.product.item.id);
      product.count = value;
      if (value > 0)
        this._cart.addCollection(this.product);
    }

  }
}

@Directive({
  selector: '[appCart]'
})
export class CartDirective implements AfterViewInit {
  @Input('product') product: IProduct;
  @Input('remove') remove: boolean = false;
  @Input('removeAll') removeAll: boolean = false;
  @Input('display') display: boolean;

  text: string = 'Add to Cart';

  constructor(private el: ElementRef, private _cart: CartService, private _not: NotificationService) {
  }

  ngAfterViewInit() {
    if (this.display)
      this.calculate();

    this._cart.change.subscribe(() => {
      this.calculate();
    });
  }

  calculate() {
    if (this.display) {
      let count = this._cart.get(this.product.id);
      if (count != null && count.count > 0) {
        this.el.nativeElement.innerHTML = this.text + ` (${count.count})`;
      }
      else
        this.el.nativeElement.innerHTML = this.text;
    }
  }

  @HostListener('click', ['$event']) onClick($event) {
    if (this.remove || this.removeAll) {
      this._cart.remove(this.product, this.removeAll);
      this._not.info(`Removed ${this.product.name}`);
    }
    else {
      this._cart.add(this.product, true);
      this._not.success(`Added ${this.product.name}`);
    }
  }
}
