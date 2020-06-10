export interface Tile {
  imagePath: string;
  index: number;
  opened: boolean;
  matched: boolean;
  isLandscape: boolean;
  isEffects: boolean;
}
