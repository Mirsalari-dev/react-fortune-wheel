import { CSSProperties } from "react";

/**
 * Merges multiple style objects into a single style object
 */
export const mergeStyles = (
  ...styles: (CSSProperties | undefined)[]
): CSSProperties => {
  return Object.assign({}, ...styles.filter(Boolean));
};

/**
 * Extracts className and style from a style prop that can be either a string (className) or CSSProperties
 */
export const extractStyleProps = (style?: CSSProperties | string) => {
  if (!style) return { className: undefined, style: undefined };

  if (typeof style === "string") {
    return { className: style, style: undefined };
  }

  return { className: undefined, style };
};
