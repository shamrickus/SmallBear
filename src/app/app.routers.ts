import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {NgModule} from '@angular/core';
import {StoreComponent} from './pages/store/store.component';
import {CartComponent} from './payments/cart/cart.component';
import {AdminGuard} from './admin-guard';

export const routes: Routes = [
  {
    path: 'home',
    data: {index: 'home'},
    component: HomeComponent
  },
  {
    path: 'store',
    data: {index: 'store'},
    component: StoreComponent
  },
  {
    path: 'admin',
    loadChildren: './lazy/lazy.module#LazyModule',
    canActivate: [AdminGuard],
    canLoad: [AdminGuard],
    data: {index: 'admin'}
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
    data: {index: 'home'}
  },
  {
    path: 'cart',
    data: {index: 'cart'},
    component: CartComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRouterModule {
}
