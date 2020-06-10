import {
  trigger,
  query,
  state,
  animate,
  transition,
  style,
  stagger,
} from '@angular/animations';

export const leaderboardListAnimation = trigger('listAnimation', [
  transition('* => *', [
    query(
      '.wm-leaderboard__leader-item',
      style({
        // transform: 'translateX(-100%)',
        opacity: 0,
      })
    ),
    query(
      'div',
      stagger('200ms', [
        animate(
          '100ms',
          style({
            opacity: 0,
          })
        ),
        animate(
          '200ms ease-in',
          style({
            transform: 'translateX(0)',
          })
        ),
      ])
    ),
  ]),
]);
