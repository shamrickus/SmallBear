import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Sort} from '@angular/material';
import {DbService} from '../../core/db/db.service';
import {IProduct} from '../../payments/payment.module';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  productObservable: Observable<IProduct[]>;
  sortedBeans: any;
  constructor(private db: DbService) { }

  ngOnInit() {
    this.productObservable = this.db.list('/products');
    this.productObservable.subscribe(res => {
      this.sortedBeans = res;
    })
  }

  sortData(sort: Sort) {
    this.productObservable.subscribe(res => {
      const data = res;
      if(!sort.active || sort.direction === '') {
        this.sortedBeans = data;
        return;
      }

      this.sortedBeans = data.sort((a, b) => {
        let isAsc = sort.direction == 'asc';
        switch (sort.active) {
          case 'name': return compare(a.name, b.name, isAsc);
          case 'origin': return compare(a.origin, b.origin, isAsc);
          case 'roast': return compare(a.roast, b.roast, isAsc);
          case 'notes': return compare(a.notes, b.notes, isAsc);
          case 'price': return compare(+a.price, +b.price, isAsc);
          default: return 0;
        }
      });

      function compare(a, b, isAsc) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
      }
    });
  }
}
