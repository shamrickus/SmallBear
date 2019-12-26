import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './core/auth/auth.service';
import {Observable} from 'rxjs/Observable';
import {DbService} from './core/db/db.service';
import {environment} from '../environments/environment.prod';

@Injectable()
export class AdminGuard implements CanActivate, CanLoad {
  constructor(public auth: AuthService, public db: DbService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.isAdmin();
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.isAdmin();
  }

  isAdmin(): Promise<boolean> {
    return new Promise<boolean>(sub => {
      this.db.list(`users/${this.auth.currentUserId}`).subscribe(result => {
          if (result.length === 3)
            sub(result[0] === true);
          else
            sub(false);
        },
        fail => {
          if (!environment.production)
            console.log(fail);
        });
    });
  }
}
