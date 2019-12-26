import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  @Output() clickEvt: EventEmitter<any> = new EventEmitter();
  address: FormGroup;

  states = ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM',
    'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA',
    'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV',
    'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW',
    'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA',
    'WA', 'WV', 'WI', 'WY', 'AE', 'AA', 'AP'];

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.address = this.fb.group({
      street: ['', [Validators.required, Validators.maxLength(250)]],
      city: ['', [Validators.required, Validators.maxLength(100)]],
      state: ['', Validators.required],
      zip: ['', Validators.required]
    });
  }

  getErrorMessage(control) {
    return control.hasError('required') ? 'You must enter a value' :
      control.hasError('pattern') ? 'Please enter a valid value' :
        control.hasError('maxlength') ? 'Please enter less characters' :
          '';
  }

  next() {
    this.clickEvt.emit({
      street: this.address.controls['street'].value,
      city: this.address.controls['city'].value,
      state: this.address.controls['state'].value,
      zip: this.address.controls['zip'].value,
    });
  }
}

@Component({
  selector: 'app-address-dialog',
  template: '<app-address (clickEvt)="next($event)"></app-address>'
})
export class AddressDialogComponent {
  constructor(public dialogRef: MatDialogRef<AddressDialogComponent, any>) {
  }

  next($event) {
    this.dialogRef.close($event);
  }
}
