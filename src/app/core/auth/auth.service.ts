import {EventEmitter, Injectable, Output} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';
import {DbService} from '../db/db.service';


export interface IAuthService {
  authChange: EventEmitter<any>;
  readonly authenticated: boolean;
  readonly currentUser: any;
  readonly currentUserObservable: any;
  readonly currentUserId: string;
  readonly currentUserAnonymous: boolean;
  readonly currentUserDisplayName: string;

  googleLogin(): Promise<void>;

  facebookLogin(): Promise<void>;

  twitterLogin(): Promise<void>;

  socialSignIn(provider): Promise<any>;

  signOut(): void;

  updateUserData(): void;
}

@Injectable()
export class AuthService implements IAuthService {
  authState: firebase.User = null;
  @Output() authChange: EventEmitter<any> = new EventEmitter();

  constructor(private afAuth: AngularFireAuth,
              private db: DbService,
              private router: Router) {

    this.afAuth.authState.subscribe((auth: firebase.User) => {
      this.authState = auth;
    });
  }


  get authenticated(): boolean {
    return this.authState !== null;
  }

  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  get currentUserObservable(): any {
    return this.afAuth.authState;
  }

  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  get currentUserEmail(): string {
    return this.authenticated ? this.authState.email : '';
  }

  get currentUserAnonymous(): boolean {
    return this.authenticated ? this.authState.isAnonymous : false;
  }

  get currentUserDisplayName(): string {
    if (!this.authState) {
      return 'Guest';
    }
    else if (this.currentUserAnonymous) {
      return 'Anonymous';
    }
    else {
      return this.authState['displayName'] || 'User without a Name';
    }
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.socialSignIn(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.socialSignIn(provider);
  }

  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider();
    return this.socialSignIn(provider);
  }

  socialSignIn(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.authState = credential.user;
        this.updateUserData();
      })
      .catch(error => console.log(error));
  }

  signOut(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

  updateUserData(): void {
    let path = `users/${this.currentUserId}`;
    let data = {
      email: this.authState.email,
      name: this.authState.displayName
    };

    this.db.store(data, path);
  }

}
