import {Injectable} from '@angular/core';
import {NotificationsService, NotificationType} from 'angular2-notifications';

export interface INotificationService {
  options: { timeOut: number; showProgressBar: boolean; clickToClose: boolean; maxStack: number; preventLastDuplicates: boolean; pauseOnHover: boolean };

  success(msg: string, title: string): void;

  error(msg: string, title: string): void;

  info(msg: string, title: string): void;

  warn(msg: string, title: string): void;

  alert(msg: string, title: string): void;

  show(title: string, msg: string, type: string): void;
}

@Injectable()
export class NotificationService implements INotificationService {
  toasts = [];
  options = {
    timeOut: 3000,
    showProgressBar: false,
    clickToClose: true,
    maxStack: 3,
    preventLastDuplicates: true,
    pauseOnHover: false
  };

  constructor(private _service: NotificationsService) {
  }

  success(msg: string, title: string = 'Success') {
    this.show(title, msg, 'success');
  }

  error(msg: string, title: string = 'Error') {
    this.show(title, msg, 'error');
  }

  info(msg: string, title: string = 'Info') {
    this.show(title, msg, 'info');
  }

  warn(msg: string, title: string = 'Warn') {
    this.show(title, msg, 'warn');
  }

  alert(msg: string, title: string = 'Alert') {
    this.show(title, msg, 'alert');
  }

  show(title: string, msg: string, type: string) {
    while (this.toasts.length >= 3) {
      this._service.remove(this.toasts[0]);
    }
    let toast = this._service.create(title, msg, NotificationType[type], this.options);
    this.toasts.push(toast.id);
  }

  public onCreate(event) {
  }

  public onDestroy(event) {
    this.toasts.splice(0, 1);
  }
}
