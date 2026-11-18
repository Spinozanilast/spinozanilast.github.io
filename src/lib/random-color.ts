export type RandomColorOptions = {
  saturation?: number;
  lightness?: number;
  alpha?: number;
};

const DEFAULT_RANDOM_COLOR_OPTIONS: Required<RandomColorOptions> = {
  saturation: 80,
  lightness: 60,
  alpha: 0.15,
};

/** Returns a random hue from 0 to 359 degrees. */
export function randomHue(): number {
  return Math.floor(Math.random() * 360);
}

/** Returns a random hsla color, optionally tuned with saturation, lightness and alpha. */
export function randomColor(options: RandomColorOptions = {}): string {
  const { saturation, lightness, alpha } = {
    ...DEFAULT_RANDOM_COLOR_OPTIONS,
    ...options,
  };

  return `hsla(${randomHue()}, ${saturation}%, ${lightness}%, ${alpha})`;
}
