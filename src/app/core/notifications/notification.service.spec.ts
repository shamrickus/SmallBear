import { TestBed, inject } from '@angular/core/testing';

import {INotificationService, NotificationService} from './notification.service';
import {SimpleNotificationsModule} from 'angular2-notifications';

export class NotificationStub implements INotificationService {
  options: { timeOut: number; showProgressBar: boolean; clickToClose: boolean; maxStack: number; preventLastDuplicates: boolean; pauseOnHover: boolean };

  success(msg: string, title: string): void {
  }

  error(msg: string, title: string): void {
  }

  info(msg: string, title: string): void {
  }

  warn(msg: string, title: string): void {
  }

  alert(msg: string, title: string): void {
  }

  show(title: string, msg: string, type: string): void {
  }

}

describe('NotificationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SimpleNotificationsModule.forRoot()
      ],
      providers: [NotificationService]
    });
  });

  it('should be created', inject([NotificationService], (service: NotificationService) => {
    expect(service).toBeTruthy();
  }));
});
