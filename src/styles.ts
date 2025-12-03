import { CSSProperties } from "react";
import { WheelColors } from "./types";

/**
 * CSS keyframes for bounce animation
 */
export const BOUNCE_KEYFRAMES = `
  @keyframes spinwheel-bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`;

/**
 * Default base styles for container
 */
export const getContainerBaseStyle = (): CSSProperties => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "24px",
  padding: "24px",
});

/**
 * Default base styles for pointer
 */
export const getPointerBaseStyle = (): CSSProperties => ({
  width: 0,
  height: 0,
  zIndex: 20,
});

/**
 * Default base styles for wheel container
 */
export const getWheelContainerBaseStyle = (size: number): CSSProperties => ({
  position: "relative",
  width: size,
  height: size,
});

/**
 * Default base styles for canvas
 */
export const getCanvasBaseStyle = (): CSSProperties => ({
  borderRadius: "50%",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
});

/**
 * Default base styles for button
 */
export const getButtonBaseStyle = (
  isSpinning: boolean,
  disabled: boolean,
  disableButton: boolean,
  buttonHover: boolean,
  buttonActive: boolean
): CSSProperties => {
  const getButtonTransform = () => {
    const baseTransform = "translate(-50%, -50%)";
    let scale = "scale(1)";

    if (buttonHover && !isSpinning && !disabled && !disableButton) {
      scale = "scale(1.1)";
    } else if (buttonActive) {
      scale = "scale(0.95)";
    }

    return `${baseTransform} ${scale}`;
  };

  return {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: getButtonTransform(),
    borderRadius: "50%",
    color: "#ffffff",
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    transition: "all 0.2s ease-in-out",
    border: "none",
    cursor: isSpinning || disabled || disableButton ? "not-allowed" : "pointer",
    opacity: isSpinning || disabled || disableButton ? 0.5 : 1,
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
};

/**
 * Default base styles for winner box
 */
export const getWinnerBoxBaseStyle = (
  colors: WheelColors,
  animateWinner: boolean
): CSSProperties => ({
  backgroundColor: colors.winnerBoxBg || "#dcfce7",
  border: `2px solid ${colors.winnerBoxBorder || "#22c55e"}`,
  borderRadius: "8px",
  padding: "16px",
  animation: animateWinner
    ? "spinwheel-bounce 1s ease-in-out infinite"
    : "none",
});

/**
 * Default base styles for winner text
 */
export const getWinnerTextBaseStyle = (colors: WheelColors): CSSProperties => ({
  fontSize: "1.25rem",
  fontWeight: "bold",
  color: colors.winnerText || "#15803d",
  margin: 0,
});
