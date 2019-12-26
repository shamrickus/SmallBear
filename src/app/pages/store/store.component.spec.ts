import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreComponent } from './store.component';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {LoadingComponent} from '../../core/loading/loading.component';
import {MaterialModule} from '../../app.material';
import {PaymentModule} from '../../payments/payment.module';
import {environment} from '../../../environments/environment';
import {AngularFireModule} from 'angularfire2';
import {DbService, IDbService} from '../../core/db/db.service';
import {Observable} from 'rxjs/Observable';
import {EventEmitter} from '@angular/core';

class db implements IDbService {
  public list(path: string): Observable<any[]> {
    return new EventEmitter<any[]>();
  }

  store(value: any, path: string) {
  }

}
let Db = new db();
describe('StoreComponent', () => {
  let component: StoreComponent;
  let fixture: ComponentFixture<StoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StoreComponent,
        LoadingComponent,
      ],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        MaterialModule,
        PaymentModule,
      ],
      providers: [
        {provide: DbService, useValue: Db}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
