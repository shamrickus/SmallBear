import { TestBed, inject } from '@angular/core/testing';

import {AuthService, IAuthService} from './auth.service';
import {AngularFireAuth, AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabase, AngularFireDatabaseModule} from 'angularfire2/database';
import {RouterTestingModule} from '@angular/router/testing';
import {environment} from '../../../environments/environment';
import {AngularFireModule} from 'angularfire2';
import {EventEmitter} from '@angular/core';
import {DbService} from "../db/db.service";

export class AuthStub implements IAuthService {
  authChange: EventEmitter<any> = new EventEmitter<any>();
  authenticated: boolean;
  currentUser: any;
  currentUserObservable: any;
  currentUserId: string;
  currentUserAnonymous: boolean;
  currentUserDisplayName: string;

  googleLogin(): Promise<void> {
    return undefined;
  }

  facebookLogin(): Promise<void> {
    return undefined;
  }

  twitterLogin(): Promise<void> {
    return undefined;
  }

  socialSignIn(provider): Promise<any> {
    return undefined;
  }

  emailSignUp(email: string, password: string): Promise<any> {
    return undefined;
  }

  emailLogin(email: string, password: string): Promise<any> {
    return undefined;
  }

  resetPassword(email: string): Promise<any> {
    return undefined;
  }

  signOut(): void {
  }

  updateUserData(): void {
  }

}

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        {provide: AuthService, useValue: {}},
        {provide: DbService, useValue: {}}
      ]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
