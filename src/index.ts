// Main component export
export { default } from "./Luckywheel";
export { default as SpinWheel } from "./Luckywheel";

// Type exports
export type {
  WheelItem,
  WheelStyles,
  WheelColors,
  PointerConfig,
  ButtonConfig,
  WinnerDisplayConfig,
  CanvasConfig,
  WheelProps,
} from "./types";

// Constant exports (optional, for advanced usage)
export {
  DEFAULT_COLORS,
  DEFAULT_SPIN_DURATION,
  DEFAULT_MIN_SPINS,
  DEFAULT_SIZE,
  DEFAULT_EASING,
} from "./constants";
