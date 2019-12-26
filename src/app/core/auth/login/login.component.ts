import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {MatDialog, MatDialogRef} from '@angular/material';
import {NotificationService} from '../../notifications/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public dialog: MatDialog, public auth: AuthService, public conf: NotificationService) {

  }

  ngOnInit() {
  }

  openDialog(): void {
    let ref = this.dialog.open(DialogLogin, {
      minHeight: '200px',
      maxHeight: '65vh'
    });
  }

  signOut(): void {
    this.auth.signOut();
    this.conf.info('Signed out');
  }
}


@Component({
  selector: 'dialog-login',
  templateUrl: './dialog.login.html',
  styleUrls: ['./dialog.login.scss']
})
export class DialogLogin {
  constructor(public dialogRef: MatDialogRef<DialogLogin>, public auth: AuthService
    , private notification: NotificationService) {
  }

  signInCall(): void {
    if (this.auth.authenticated) {
      this.notification.success('Logged in');
    }
    this.dialogRef.close();
  }

  signInGoogle(): void {
    this.auth.googleLogin()
      .then(() => this.signInCall());
  }

  signInFacebook(): void {
    this.auth.facebookLogin()
      .then(() => this.signInCall());
  }
}
