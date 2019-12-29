import { TestBed, inject } from '@angular/core/testing';

import {DbService, IDbService} from './db.service';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {environment} from '../../../environments/environment';
import {AngularFireModule} from 'angularfire2';
import {AuthService} from '../auth/auth.service';
import {Observable} from 'rxjs/Observable';
import {EventEmitter} from '@angular/core';

export class DbStub implements IDbService {
  list(path: string): Observable<any[]> {
    return undefined;
  }

  store(value: any, path: string) {
  }

}

describe('DbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: DbService, useValue: {}},
        {provide: AuthService, useValue: {authChange: new EventEmitter()}}
      ],
      imports: [
      ]
    });
  });

  it('should be created', inject([DbService], (service: DbService) => {
    expect(service).toBeTruthy();
  }));
});
