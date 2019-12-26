import {Injectable} from '@angular/core';
import {List} from 'linqts';
import {environment} from '../../../environments/environment';

export interface ICacheService {
  prefix: string;

  getKeys(): List<string>;

  parse(value: string): any;

  store(key: string, value: any): void;

  retrieve(key: string): any;

  delete(key: string): void;

  list(): List<any>;

  clear(): void;
}

@Injectable()
export class CacheService implements ICacheService {
  prefix: string = environment.firebase.projectId + ':';

  constructor() { }

  getKeys(): List<string> {
    let keys = new List<string>();
    for (let i = 0, len = localStorage.length; i < len; ++i) {
      let key = localStorage.key(i);
      if (key && key.startsWith(this.prefix)) {
        keys.Add(key);
      }
    }
    return keys;
  }

  parse(value: string) {
    if (value)
      return JSON.parse(value);
  }

  store(key: string, value: any) {
    window.localStorage.setItem(this.prefix + key, JSON.stringify(value));
  }

  retrieve(key: string): any {
    if (!key.startsWith(this.prefix))
      key = this.prefix + key;
    return this.parse(window.localStorage.getItem(key));
  }

  delete(key: string) {
    localStorage.removeItem(this.prefix + key);
  }

  list(): List<any> {
    let values = new List<any>();
    for (let key of this.getKeys().ToArray()) {
      values.Add(this.retrieve(key));
    }
    return values;
  }

  clear() {
    for (let key of this.getKeys().ToArray()) {
      window.localStorage.removeItem(key);
    }
  }
}
