// DEFAULTS
export const DEFAULT_BALK_WIDTH = 5; // meters
export const DEFAULT_BALK_DEPTH = 3;

// maximum allowed dimensions from width and depth slider inputs
export const MAX_WIDTH = 20; // meters
export const MIN_WIDTH = 3;
export const MAX_DEPTH = 5;
export const MIN_DEPTH = 3;

// THRESHOLDS
// should match the thresholds used in your createBalksAndCorners function
export const X_THRESHOLD = 4;
export const Z_THRESHOLD = 4;

// CALCULATE LIMITS
const MAX_X_POINTS = Math.ceil(MAX_WIDTH / X_THRESHOLD) + 1;
const MAX_Z_POINTS = Math.ceil(MAX_DEPTH / Z_THRESHOLD) + 1;

// Maximum number of balks is the perimeter of the grid
export const BALKS_LIMIT = 2 * (MAX_X_POINTS + MAX_Z_POINTS - 2);

// Maximum number of corners is twice the number of balks (two corners per balk)
export const CORNERS_LIMIT = BALKS_LIMIT * 2;

const BUFFER_FACTOR = 1.1;
export const BUFFERED_BALKS_LIMIT = Math.ceil(BALKS_LIMIT * BUFFER_FACTOR);
export const BUFFERED_CORNERS_LIMIT = Math.ceil(CORNERS_LIMIT * BUFFER_FACTOR);
