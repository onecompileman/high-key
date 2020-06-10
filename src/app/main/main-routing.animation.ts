import {
  trigger,
  state,
  transition,
  query,
  style,
  animate,
  animateChild,
  group,
} from '@angular/animations';

export const mainRoutingAnimation = trigger('routeAnimations', [
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'relative',
          top: 0,
          left: 0,
          width: '100%',
        }),
      ],
      { optional: true }
    ),
    query(':enter', [style({ left: '-100%' })], { optional: true }),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(':leave', [animate('400ms ease-out', style({ left: '100%' }))], {
        optional: true,
      }),
      query(':enter', [animate('400ms ease-out', style({ left: '0%' }))], {
        optional: true,
      }),
    ]),
    query(':enter', animateChild(), { optional: true }),
  ]),
]);
