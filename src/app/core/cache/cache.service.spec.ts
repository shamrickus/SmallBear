import { TestBed, inject } from '@angular/core/testing';

import {CacheService, ICacheService} from './cache.service';
import {List} from 'linqts';

export class CacheStub implements ICacheService {
  prefix: string;

  getKeys(): List<string> {
    return undefined;
  }

  parse(value: string): any {
    return undefined;
  }

  retrieve(key: string): any {
    return undefined;
  }
  clear() { }
  list() { return new List<any>();}
  store(key, value) {}
  delete(key) {}
}

let key = "test";
let value = {value: "asdf"};
describe('CacheService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CacheService]
    });
  });

  it('should be created', inject([CacheService], (service: CacheService) => {
    expect(service).toBeTruthy();
  }));

  it("Add Item", inject([CacheService], (service: CacheService) => {
    service.store(key, value);
    expect(service.retrieve(key)).toBeTruthy();
  }));

  it("Delete Item", inject([CacheService], (service: CacheService) => {
    service.store(key, value);
    service.delete(key);
    expect(service.list().Count()).toBe(0);
  }));

  it("Clear Items", inject([CacheService], (service: CacheService) => {
    for(let i = 0; i < 5; ++i) {
      service.store(key + i, value);
    }
    expect(service.list().Count()).toBe(5);

    service.clear();
    expect(service.list().Count()).toBe(0);
  }));

});
