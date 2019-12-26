import {Component, Input, OnInit} from '@angular/core';
import {IToken} from '../lazy.module';
import {DbService} from '../../core/db/db.service';
import {NotificationService} from '../../core/notifications/notification.service';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent implements OnInit {
  @Input('Token') token: IToken;

  constructor(private _db: DbService, private _notify: NotificationService) {
  }

  ngOnInit() {
  }

  getStatus(): string[] {
    let res = ['Processed'];

    if (this.token != undefined) {
      if (this.token.token.charge != undefined)
        res.push('Paid');

      if (this.token.token.shipped != undefined)
        res.push('Shipped');
    }

    return res;
  }

  shipTo() {
    let res = prompt('Estimated arrival date?');

    this._db.store({'shipped': res}, `payments/${this.token.uid}/${this.token.token.id}/token`);
  }

}
