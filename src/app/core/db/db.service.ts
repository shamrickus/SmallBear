import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs';

export interface IDbService {
  list(path: string): Observable<any[]>;

  store(value: any, path: string);
}

@Injectable()
export class DbService implements IDbService {

  constructor(private _db: AngularFireDatabase) {
  }

  public list(path: string): Observable<any[]> {
    return this._db.list(path).valueChanges();
  }

  store(value: any, path: string) {
    this._db.object(path).update(value);
  }
}

