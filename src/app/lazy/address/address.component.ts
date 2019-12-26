import {Component, Input, OnInit} from '@angular/core';
import {IAddress} from '../../payments/payment.module';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  @Input('address') address: IAddress;

  constructor() {
  }

  ngOnInit() {
  }

}
