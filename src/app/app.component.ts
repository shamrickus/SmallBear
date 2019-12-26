import {Component, OnInit, Renderer2} from '@angular/core';
import {routerTransition} from './app.animations';
import {Router, RouterOutlet} from '@angular/router';
import {NotificationService} from './core/notifications/notification.service';
import {DbService} from './core/db/db.service';
import {environment} from '../environments/environment.prod';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerTransition]
})
export class AppComponent implements OnInit {
  routeLinks: any[];
  activeLinkIndex: number = -1;
  rand: number = Math.random();
  test: boolean = false;

  constructor(public router: Router, public _notification: NotificationService, public renderer: Renderer2, public db: DbService) {
    this.routeLinks = [
      {path: 'home', name: 'Home'},
      {path: 'store', name: 'Store'}
    ];
  }

  getBG(): string {
    let value = this.rand * 3;
    if (value < 1) return 'bg1';
    else if (value < 2) return 'bg2';
    else return 'bg3';
  };

  ngOnInit() {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.routeLinks.indexOf(
        this.routeLinks.find(tab => tab.link === '.' + this.router.url)
      );
    });
    this.renderer.addClass(document.getElementById('mainContent'), this.getBG());
  }

  getState(outlet: RouterOutlet) {
    return outlet.activatedRouteData.index;
  }

  getPW() {
    let res = prompt('Secret');

    this.db.list('/secret')
      .subscribe(result => {
          if (result.length == 1 && result[0] == res)
            this.router.navigateByUrl('admin/admin-page');
        },
        fail => {
          if (!environment.production)
            console.log(fail);
        });
  }
}
