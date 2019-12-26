import {animate, group, query, style, transition, trigger} from '@angular/animations';

const swipeLeft = [
  query(':enter, :leave', style({height: '100%', position: 'fixed', padding: '0 5px 0 5px', width: 'calc(100%)'}),
    {optional: true}
  ),
  group([  // block executes in parallel
    query(':enter', [
      style({transform: 'translateX(-100%)', opacity: '0'}),
      animate('0.5s ease-in-out', style({transform: 'translateX(0%)', opacity: '.9'}))
    ], {optional: true}),
    query(':leave', [
      style({transform: 'translateX(0%)', opacity: '.9'}),
      animate('0.5s ease-in-out', style({transform: 'translateX(100%)', opacity: '0'})),
    ], {optional: true}),
  ])
];

const swipeRight = [
  query(':enter, :leave', style({height: '100%', position: 'fixed', width: 'calc(100%)'}),
    {optional: true}
  ),
  group([  // block executes in parallel
    query(':enter', [
      style({transform: 'translateX(100%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
    ], {optional: true}),
    query(':leave', [
      style({transform: 'translateX(0%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateX(-100%)'}))
    ], {optional: true}),
  ])
];

export const routerTransition = trigger('routerTransition', [
  transition('cart => home', swipeLeft),
  transition('cart => store', swipeLeft),
  transition('store => home', swipeLeft),
  transition('home => store', swipeRight),
  transition('home => cart', swipeRight),
  transition('store => cart', swipeRight)
]);

export const cardOut = trigger('cardOut', [
  transition('a <=> b', [
    animate('0.5s ease-out',
      style({
        transform: 'translateX(-20%)',
        marginTop: '-115px',
        opacity: '0'
      }))
  ])
]);
