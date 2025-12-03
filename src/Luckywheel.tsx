import React, { useState, useRef, useEffect } from "react";
import { WheelProps, WheelItem } from "./types";
import {
  DEFAULT_COLORS,
  DEFAULT_SPIN_DURATION,
  DEFAULT_MIN_SPINS,
  DEFAULT_SIZE,
  DEFAULT_EASING,
  DEFAULT_BUTTON_WIDTH,
  DEFAULT_BUTTON_HEIGHT,
  DEFAULT_BUTTON_FONT_SIZE,
  DEFAULT_BUTTON_FONT_WEIGHT,
  DEFAULT_SPINNING_TEXT,
  DEFAULT_IDLE_TEXT,
  DEFAULT_SHOW_WINNER,
  DEFAULT_WINNER_PREFIX,
  DEFAULT_ANIMATE_WINNER,
  DEFAULT_WINNER_ANIM_DURATION,
  DEFAULT_SEGMENT_BORDER_WIDTH,
  DEFAULT_SEGMENT_BORDER_COLOR,
  DEFAULT_CENTER_CIRCLE_RADIUS,
  DEFAULT_CENTER_CIRCLE_BORDER_WIDTH,
  DEFAULT_TEXT_FONT,
  DEFAULT_TEXT_SIZE,
  DEFAULT_TEXT_DISTANCE,
} from "./constants";
import { mergeStyles, extractStyleProps } from "./utils";
import {
  BOUNCE_KEYFRAMES,
  getContainerBaseStyle,
  getPointerBaseStyle,
  getWheelContainerBaseStyle,
  getCanvasBaseStyle,
  getButtonBaseStyle,
  getWinnerBoxBaseStyle,
  getWinnerTextBaseStyle,
} from "./styles";
import { selectWinner, getPointerPosition } from "./helpers";

export default function SpinWheel({
  items,
  onSpinStart,
  onSpinEnd,
  spinDuration = DEFAULT_SPIN_DURATION,
  minSpins = DEFAULT_MIN_SPINS,
  maxSpins,
  size = DEFAULT_SIZE,
  disabled = false,
  styles = {},
  colors = {},
  pointerConfig = {},
  buttonConfig = {},
  winnerDisplay = {},
  canvasConfig = {},
  defaultColors = DEFAULT_COLORS,
  easing = DEFAULT_EASING,
  disableButton = false,
  hideButton = false,
  hidePointer = false,
}: WheelProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedItem, setSelectedItem] = useState<WheelItem | null>(null);
  const [buttonHover, setButtonHover] = useState(false);
  const [buttonActive, setButtonActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Extract pointer configuration
  const { style: pointerStyle = {} } = pointerConfig;

  // Extract button configuration
  const {
    width: buttonWidth = DEFAULT_BUTTON_WIDTH,
    height: buttonHeight = DEFAULT_BUTTON_HEIGHT,
    fontSize: buttonFontSize = DEFAULT_BUTTON_FONT_SIZE,
    fontWeight: buttonFontWeight = DEFAULT_BUTTON_FONT_WEIGHT,
    spinningText = DEFAULT_SPINNING_TEXT,
    idleText = DEFAULT_IDLE_TEXT,
    style: buttonStyle = {},
  } = buttonConfig;

  // Extract winner display configuration
  const {
    show: showWinner = DEFAULT_SHOW_WINNER,
    prefix: winnerPrefix = DEFAULT_WINNER_PREFIX,
    animate: animateWinner = DEFAULT_ANIMATE_WINNER,
    duration: winnerAnimDuration = DEFAULT_WINNER_ANIM_DURATION,
    style: winnerStyle = {},
  } = winnerDisplay;

  // Extract canvas configuration
  const {
    segmentBorderWidth = DEFAULT_SEGMENT_BORDER_WIDTH,
    segmentBorderColor = DEFAULT_SEGMENT_BORDER_COLOR,
    centerCircleRadius = DEFAULT_CENTER_CIRCLE_RADIUS,
    centerCircleBorderWidth = DEFAULT_CENTER_CIRCLE_BORDER_WIDTH,
    textFont = DEFAULT_TEXT_FONT,
    textSize = DEFAULT_TEXT_SIZE,
    textDistance = DEFAULT_TEXT_DISTANCE,
  } = canvasConfig;

  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);

  // Draw wheel on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 - 10;

    ctx.clearRect(0, 0, size, size);

    const anglePerItem = (2 * Math.PI) / items.length;

    items.forEach((item, index) => {
      const startAngle = index * anglePerItem - Math.PI / 2;
      const endAngle = startAngle + anglePerItem;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.lineTo(centerX, centerY);
      ctx.fillStyle = item.color || defaultColors[index % defaultColors.length];
      ctx.fill();
      ctx.strokeStyle = colors.segmentBorder || segmentBorderColor;
      ctx.lineWidth = segmentBorderWidth;
      ctx.stroke();

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + anglePerItem / 2);
      ctx.textAlign = "center";
      ctx.fillStyle = item.textColor || "#000";
      ctx.font = `bold ${textSize}px ${textFont}`;
      ctx.fillText(item.label, radius / textDistance, 0);
      ctx.restore();
    });

    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, centerCircleRadius, 0, 2 * Math.PI);
    ctx.fillStyle = colors.centerCircle || "#fff";
    ctx.fill();
    ctx.strokeStyle = colors.centerCircleBorder || "#333";
    ctx.lineWidth = centerCircleBorderWidth;
    ctx.stroke();
  }, [
    items,
    size,
    defaultColors,
    colors,
    segmentBorderColor,
    segmentBorderWidth,
    centerCircleRadius,
    centerCircleBorderWidth,
    textFont,
    textSize,
    textDistance,
  ]);

  const handleSpin = () => {
    if (isSpinning || disabled || disableButton) return;

    setIsSpinning(true);

    if (onSpinStart) {
      onSpinStart();
    }

    const winner = selectWinner(items, totalWeight);
    const winnerIndex = items.findIndex((item) => item.id === winner.id);

    const anglePerItem = 360 / items.length;
    const winnerCenterAngle = winnerIndex * anglePerItem + anglePerItem / 2;

    const actualSpins = maxSpins
      ? minSpins + Math.random() * (maxSpins - minSpins)
      : minSpins;
    const spins = actualSpins * 360;

    const currentNormalizedRotation = rotation % 360;
    const targetAngle = 360 - winnerCenterAngle;
    const finalRotation =
      rotation - currentNormalizedRotation + spins + targetAngle;

    setRotation(finalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setSelectedItem(winner);
      if (onSpinEnd) {
        onSpinEnd(winner);
      }

      if (winnerAnimDuration > 0) {
        setTimeout(() => {
          setSelectedItem(null);
        }, winnerAnimDuration);
      }
    }, spinDuration);
  };

  const pointerPos = getPointerPosition(pointerConfig, colors);

  // Extract style props
  const containerStyleProps = extractStyleProps(styles.container);
  const pointerStyleProps = extractStyleProps(styles.pointer);
  const wheelContainerStyleProps = extractStyleProps(styles.wheelContainer);
  const canvasStyleProps = extractStyleProps(styles.canvas);
  const buttonStyleProps = extractStyleProps(styles.button);
  const winnerBoxStyleProps = extractStyleProps(styles.winnerBox);
  const winnerTextStyleProps = extractStyleProps(styles.winnerText);

  return (
    <>
      <style>{BOUNCE_KEYFRAMES}</style>
      <div
        className={containerStyleProps.className}
        style={mergeStyles(getContainerBaseStyle(), containerStyleProps.style)}
      >
        {/* Pointer indicator */}
        {!hidePointer && (
          <div
            className={pointerStyleProps.className}
            style={mergeStyles(
              getPointerBaseStyle(),
              pointerPos.borderStyle,
              pointerPos.style,
              pointerStyle,
              pointerStyleProps.style
            )}
          />
        )}

        {/* Wheel container */}
        <div
          className={wheelContainerStyleProps.className}
          style={mergeStyles(
            getWheelContainerBaseStyle(size),
            wheelContainerStyleProps.style
          )}
        >
          <div
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning
                ? `transform ${spinDuration}ms ${easing}`
                : "none",
            }}
          >
            <canvas
              ref={canvasRef}
              width={size}
              height={size}
              className={canvasStyleProps.className}
              style={mergeStyles(getCanvasBaseStyle(), canvasStyleProps.style)}
            />
          </div>

          {/* Center button */}
          {!hideButton && (
            <button
              onClick={handleSpin}
              disabled={isSpinning || disabled || disableButton}
              onMouseEnter={() => setButtonHover(true)}
              onMouseLeave={() => setButtonHover(false)}
              onMouseDown={() => setButtonActive(true)}
              onMouseUp={() => setButtonActive(false)}
              className={buttonStyleProps.className}
              style={mergeStyles(
                getButtonBaseStyle(
                  isSpinning,
                  disabled,
                  disableButton,
                  buttonHover,
                  buttonActive
                ),
                {
                  width: buttonWidth,
                  height: buttonHeight,
                  fontSize: buttonFontSize,
                  fontWeight: buttonFontWeight,
                  backgroundColor: colors.button || "#ff6b6b",
                },
                buttonStyle,
                buttonStyleProps.style
              )}
            >
              {isSpinning ? spinningText : idleText}
            </button>
          )}
        </div>

        {/* Winner display */}
        {showWinner && selectedItem && !isSpinning && (
          <div
            className={winnerBoxStyleProps.className}
            style={mergeStyles(
              getWinnerBoxBaseStyle(colors, animateWinner),
              winnerStyle,
              winnerBoxStyleProps.style
            )}
          >
            <p
              className={winnerTextStyleProps.className}
              style={mergeStyles(
                getWinnerTextBaseStyle(colors),
                colors.winnerText ? { color: colors.winnerText } : {},
                winnerTextStyleProps.style
              )}
            >
              {winnerPrefix}
              {selectedItem.label}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
