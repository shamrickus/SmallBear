import {Component, OnInit} from '@angular/core';
import {DbService} from '../../core/db/db.service';
import {IToken} from '../lazy.module';
import {List} from 'linqts';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  tokens: List<IToken[]> = new List<IToken[]>();
  obs: Observable<any>;

  constructor(public db: DbService) {
  }

  ngOnInit() {
    this.obs = this.db.list('/payments/');
    this.obs.subscribe(result => {
      this.tokens = new List<IToken[]>();
      for (let token of result) {
        this.tokens.Add(Object.values(token));
      }
      console.log(this.tokens);
    }, err => alert(err));
  }

  get Tokens(): IToken[][] {
    return this.tokens
      .ToArray();
  }
}
