import { CSSProperties } from "react";
import { WheelItem, PointerConfig, WheelColors } from "./types";
import {
  DEFAULT_POINTER_WIDTH,
  DEFAULT_POINTER_HEIGHT,
  DEFAULT_POINTER_POSITION,
  DEFAULT_POINTER_OFFSET,
} from "./constants";

/**
 * Selects a winner based on weighted random selection
 */
export const selectWinner = (
  items: WheelItem[],
  totalWeight: number
): WheelItem => {
  const random = Math.random() * totalWeight;
  let weightSum = 0;

  for (const item of items) {
    weightSum += item.weight;
    if (random <= weightSum) {
      return item;
    }
  }
  return items[items.length - 1];
};

/**
 * Calculates pointer position styles based on configuration
 */
export const getPointerPosition = (
  pointerConfig: PointerConfig,
  colors: WheelColors
) => {
  const {
    width: pointerWidth = DEFAULT_POINTER_WIDTH,
    height: pointerHeight = DEFAULT_POINTER_HEIGHT,
    position: pointerPosition = DEFAULT_POINTER_POSITION,
    offset: pointerOffset = DEFAULT_POINTER_OFFSET,
  } = pointerConfig;

  const pointerColor = colors.pointer || "#ff6b6b";

  const positions = {
    top: {
      style: {
        marginBottom: `${pointerOffset}px`,
      },
      borderStyle: {
        borderLeft: `${pointerWidth}px solid transparent`,
        borderRight: `${pointerWidth}px solid transparent`,
        borderTop: `${pointerHeight}px solid ${pointerColor}`,
        borderBottom: "none",
      } as CSSProperties,
    },
    bottom: {
      style: {
        marginTop: `${pointerOffset}px`,
      },
      borderStyle: {
        borderLeft: `${pointerWidth}px solid transparent`,
        borderRight: `${pointerWidth}px solid transparent`,
        borderBottom: `${pointerHeight}px solid ${pointerColor}`,
        borderTop: "none",
      } as CSSProperties,
    },
    left: {
      style: {
        marginRight: `${pointerOffset}px`,
      },
      borderStyle: {
        borderTop: `${pointerWidth}px solid transparent`,
        borderBottom: `${pointerWidth}px solid transparent`,
        borderLeft: `${pointerHeight}px solid ${pointerColor}`,
        borderRight: "none",
      } as CSSProperties,
    },
    right: {
      style: {
        marginLeft: `${pointerOffset}px`,
      },
      borderStyle: {
        borderTop: `${pointerWidth}px solid transparent`,
        borderBottom: `${pointerWidth}px solid transparent`,
        borderRight: `${pointerHeight}px solid ${pointerColor}`,
        borderLeft: "none",
      } as CSSProperties,
    },
  };

  return positions[pointerPosition];
};
