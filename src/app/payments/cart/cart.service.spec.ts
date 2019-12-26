import {inject, TestBed} from '@angular/core/testing';

import {CartService, ICartService} from './cart.service';
import {IProduct, IProductAggregate, Map} from '../payment.module';
import {MaterialModule} from '../../app.material';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {NotificationService} from '../../core/notifications/notification.service';
import {CacheService} from '../../core/cache/cache.service';
import {AuthService} from '../../core/auth/auth.service';
import {List} from 'linqts';
import {EventEmitter} from '@angular/core';
import {CacheStub} from '../../core/cache/cache.service.spec';
import {AuthStub} from '../../core/auth/auth.service.spec';

let dummy: IProduct = {
  price: 30,
  id: '20',
  name: '',
  qty: '1'
};
describe('CartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartService,
        {provide: NotificationService, useValue: {}},
        {provide: CacheService, useValue: new CacheStub()},
        {provide: AuthService, useValue: new AuthStub()}],
      imports: [
        MaterialModule,
        SimpleNotificationsModule.forRoot(),
      ],
    });
  });

  it('should be created', inject([CartService], (service: CartService) => {
    expect(service).toBeTruthy();
  }));

  function assert(service: CartService, amount: number, count: number) {
    expect(service.total()).toBe(amount);
    expect(service.count()).toBe(count);
  }

  it('Get Null', inject([CartService], (service: CartService) => {
    let result = service.get('asdf');
    expect(result).toBeUndefined();
  }));

  it('Get', inject([CartService], (service: CartService) => {
    service.add(dummy);

    let result = service.get(dummy.id);
    expect(result.count).toBe(1);
    expect(result.item.id).toBe(dummy.id);
  }));

  it('Add', inject([CartService], (service: CartService) => {
    expect(service.total()).toBe(0);
    service.add(dummy);
    dummy.id = '18';
    service.add(dummy);
    service.add(dummy);
    assert(service, 90, 3);
  }));

  it('Remove', inject([CartService], (service: CartService) => {
    service.add(dummy);
    dummy.id = '20';
    service.add(dummy);
    service.add(dummy);

    assert(service, 90, 3);
    service.remove(dummy);
    assert(service, 60, 2);
  }));

  it('Remove All', inject([CartService], (service: CartService) => {
    service.add(dummy);
    service.add(dummy);
    service.add(dummy);

    service.remove(dummy, true);

    assert(service, 0, 0);
  }));
});
