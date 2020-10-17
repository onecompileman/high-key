export const Images: any = {
  balloon: {
    path: '/assets/images/obstacles/o-1.png',
    originalSize: [173, 177],
    speed: 4,
    dir: 'up',
    collision: {
      x: 0,
      y: 0,
      w: 173,
      h: 177,
    },
  },
  basketball: {
    path: '/assets/images/obstacles/o-2.png',
    originalSize: [346 * 0.8, 376 * 0.8],
    dir: 'down',
    collision: {
      x: 20,
      y: 10,
      w: 346 * 0.8,
      h: 376 * 0.8,
    },
  },
  bench: {
    path: '/assets/images/obstacles/o-3.png',
    originalSize: [293 * 0.8, 572 * 0.8],
    dir: 'down',
    collision: {
      x: 120,
      y: 0,
      w: 70 * 0.8,
      h: 572 * 0.8,
    },
  },
};
