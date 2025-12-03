import { CSSProperties } from "react";

export interface WheelItem {
  id: string | number;
  label: string;
  weight: number;
  color?: string;
  textColor?: string;
}

export interface WheelStyles {
  container?: CSSProperties | string;
  wheelContainer?: CSSProperties | string;
  canvas?: CSSProperties | string;
  button?: CSSProperties | string;
  pointer?: CSSProperties | string;
  winnerBox?: CSSProperties | string;
  winnerText?: CSSProperties | string;
}

export interface WheelColors {
  button?: string;
  pointer?: string;
  centerCircle?: string;
  centerCircleBorder?: string;
  segmentBorder?: string;
  winnerBoxBg?: string;
  winnerBoxBorder?: string;
  winnerText?: string;
}

export interface PointerConfig {
  width?: number;
  height?: number;
  position?: "top" | "right" | "bottom" | "left";
  offset?: number;
  style?: CSSProperties;
}

export interface ButtonConfig {
  width?: number;
  height?: number;
  fontSize?: string;
  fontWeight?: string;
  spinningText?: string;
  idleText?: string;
  style?: CSSProperties;
}

export interface WinnerDisplayConfig {
  show?: boolean;
  prefix?: string;
  animate?: boolean;
  duration?: number;
  style?: CSSProperties;
}

export interface CanvasConfig {
  segmentBorderWidth?: number;
  segmentBorderColor?: string;
  centerCircleRadius?: number;
  centerCircleBorderWidth?: number;
  textFont?: string;
  textSize?: number;
  textDistance?: number;
}

export interface WheelProps {
  items: WheelItem[];
  onSpinStart?: () => void;
  onSpinEnd?: (winner: WheelItem) => void;
  spinDuration?: number;
  minSpins?: number;
  maxSpins?: number;
  size?: number;
  disabled?: boolean;
  styles?: WheelStyles;
  colors?: WheelColors;
  pointerConfig?: PointerConfig;
  buttonConfig?: ButtonConfig;
  winnerDisplay?: WinnerDisplayConfig;
  canvasConfig?: CanvasConfig;
  defaultColors?: string[];
  easing?: string;
  disableButton?: boolean;
  hideButton?: boolean;
  hidePointer?: boolean;
}
