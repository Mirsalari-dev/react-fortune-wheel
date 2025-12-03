# react-fortune-wheel 🎡

A highly customizable React component for creating beautiful spinning wheel of fortune games with **Weighted Random Selection** - control the probability/chance percentage of each item! Full TypeScript support included.

## Features

- 🎯 **Weighted Random Selection** - **Control the probability/chance percentage of each item!** Set custom weights to determine win chances
- 🎨 **Fully Customizable** - Colors, sizes, animations, and more
- 🎭 **Smooth Animations** - Configurable spin duration and easing
- 📱 **Responsive** - Works on all screen sizes
- 🔧 **TypeScript** - Full TypeScript support with type definitions
- 🎪 **Flexible Configuration** - Extensive props for customization
- 🎨 **Canvas-based Rendering** - Smooth and performant

## 🎯 Why Weighted Random Selection?

Unlike simple random selection, **weighted random selection** allows you to:

- ✅ **Control win probabilities** - Set exact percentage chances for each prize
- ✅ **Create fair or unfair games** - Make rare prizes actually rare, or common prizes more common
- ✅ **Balance game economy** - Design reward systems with precise probability control
- ✅ **No manual calculations needed** - Just set weights, percentages are calculated automatically

**Example:** Want a 1% chance for a rare prize and 99% for common? Just set `weight: 1` and `weight: 99`!

## Installation

```bash
npm install react-fortune-wheel
# or
yarn add react-fortune-wheel
# or
pnpm add react-fortune-wheel
```

## Basic Usage

```tsx
import React, { useState } from "react";
import SpinWheel, { WheelItem } from "react-fortune-wheel";

function App() {
  // Define prizes with custom weights (probability percentages)
  // Higher weight = higher chance of winning
  const prizes: WheelItem[] = [
    { id: 1, label: "iPhone 15", weight: 1, color: "#FF6B6B" }, // 1% chance
    { id: 2, label: "Laptop", weight: 1, color: "#4ECDC4" }, // 1% chance
    { id: 3, label: "$1000", weight: 1, color: "#45B7D1" }, // 1% chance
    { id: 4, label: "Smart Watch", weight: 1, color: "#FFA07A" }, // 1% chance
    { id: 5, label: "$500", weight: 1, color: "#98D8C8" }, // 1% chance
    { id: 6, label: "Headphones", weight: 95, color: "#F7DC6F" }, // 95% chance
  ];

  const handleSpinEnd = (winner: WheelItem) => {
    console.log("Winner:", winner);
  };

  return (
    <SpinWheel
      items={prizes}
      onSpinEnd={handleSpinEnd}
      spinDuration={6000}
      minSpins={5}
      size={500}
    />
  );
}
```

## Props

### Required Props

| Prop    | Type          | Description                                                                                                                     |
| ------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `items` | `WheelItem[]` | Array of items to display on the wheel. Each item must have a `weight` property that controls its probability/chance percentage |

### Optional Props

| Prop            | Type                          | Default                                  | Description                                                  |
| --------------- | ----------------------------- | ---------------------------------------- | ------------------------------------------------------------ |
| `onSpinStart`   | `() => void`                  | -                                        | Callback fired when spin starts                              |
| `onSpinEnd`     | `(winner: WheelItem) => void` | -                                        | Callback fired when spin ends with winner                    |
| `spinDuration`  | `number`                      | `5000`                                   | Duration of spin animation in milliseconds                   |
| `minSpins`      | `number`                      | `5`                                      | Minimum number of full rotations                             |
| `maxSpins`      | `number`                      | -                                        | Maximum number of full rotations (if not set, uses minSpins) |
| `size`          | `number`                      | `400`                                    | Size of the wheel in pixels                                  |
| `disabled`      | `boolean`                     | `false`                                  | Disable the wheel                                            |
| `disableButton` | `boolean`                     | `false`                                  | Disable the spin button                                      |
| `hideButton`    | `boolean`                     | `false`                                  | Hide the spin button                                         |
| `hidePointer`   | `boolean`                     | `false`                                  | Hide the pointer indicator                                   |
| `easing`        | `string`                      | `"cubic-bezier(0.17, 0.67, 0.12, 0.99)"` | CSS easing function                                          |
| `defaultColors` | `string[]`                    | `[...]`                                  | Default colors for items without color                       |
| `styles`        | `WheelStyles`                 | `{}`                                     | Custom styles for different parts                            |
| `colors`        | `WheelColors`                 | `{}`                                     | Custom colors for different parts                            |
| `pointerConfig` | `PointerConfig`               | `{}`                                     | Pointer configuration                                        |
| `buttonConfig`  | `ButtonConfig`                | `{}`                                     | Button configuration                                         |
| `winnerDisplay` | `WinnerDisplayConfig`         | `{}`                                     | Winner display configuration                                 |
| `canvasConfig`  | `CanvasConfig`                | `{}`                                     | Canvas rendering configuration                               |

## Types

### WheelItem

```typescript
interface WheelItem {
  id: string | number;
  label: string;
  weight: number; // ⚡ IMPORTANT: Controls probability/chance percentage!
  // Higher weight = higher probability of winning
  // The weight determines the chance percentage automatically
  color?: string;
  textColor?: string;
}
```

> **💡 How Weighted Selection Works:**
>
> - Each item's `weight` determines its chance of being selected
> - The total probability is calculated as: `item.weight / sum(all weights) * 100%`
> - Example: If item A has `weight: 10` and item B has `weight: 90`, then A has 10% chance and B has 90% chance

### PointerConfig

```typescript
interface PointerConfig {
  width?: number; // Default: 20
  height?: number; // Default: 40
  position?: "top" | "right" | "bottom" | "left"; // Default: "top"
  offset?: number; // Default: 0
  style?: CSSProperties;
}
```

### ButtonConfig

```typescript
interface ButtonConfig {
  width?: number; // Default: 96
  height?: number; // Default: 96
  fontSize?: string; // Default: "1.125rem"
  fontWeight?: string; // Default: "bold"
  spinningText?: string; // Default: "⌛"
  idleText?: string; // Default: "بچرخان!"
  style?: CSSProperties;
}
```

### WinnerDisplayConfig

```typescript
interface WinnerDisplayConfig {
  show?: boolean; // Default: true
  prefix?: string; // Default: "🎉 برنده: "
  animate?: boolean; // Default: true
  duration?: number; // Default: 3000
  style?: CSSProperties;
}
```

### CanvasConfig

```typescript
interface CanvasConfig {
  segmentBorderWidth?: number; // Default: 3
  segmentBorderColor?: string; // Default: "#fff"
  centerCircleRadius?: number; // Default: 30
  centerCircleBorderWidth?: number; // Default: 3
  textFont?: string; // Default: "Arial"
  textSize?: number; // Default: 16
  textDistance?: number; // Default: 1.5
}
```

## Advanced Examples

### Custom Colors and Styles

```tsx
<SpinWheel
  items={prizes}
  onSpinEnd={handleSpinEnd}
  colors={{
    button: "#8B5CF6",
    pointer: "#FF6B6B",
    centerCircle: "#FFFFFF",
    winnerBoxBg: "#F0F9FF",
    winnerText: "#1E40AF",
  }}
  styles={{
    container: {
      padding: "40px",
    },
    button: {
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
    },
  }}
/>
```

### Custom Button Configuration

```tsx
<SpinWheel
  items={prizes}
  onSpinEnd={handleSpinEnd}
  buttonConfig={{
    width: 120,
    height: 120,
    fontSize: "1.5rem",
    spinningText: "⏳",
    idleText: "Spin!",
  }}
/>
```

### Custom Pointer Position

```tsx
<SpinWheel
  items={prizes}
  onSpinEnd={handleSpinEnd}
  pointerConfig={{
    position: "right",
    width: 30,
    height: 50,
    offset: 10,
  }}
/>
```

### 🎯 Weighted Random Selection (Probability Control)

**This is the core feature!** You can control the exact probability/chance percentage of each item using the `weight` property.

#### How It Works

- Each item's `weight` determines its chance of winning
- Probability is calculated automatically: `(item.weight / totalWeight) × 100%`
- Higher weight = higher probability of selection

#### Examples

**Example 1: Simple 50/50 Chance**

```tsx
const prizes: WheelItem[] = [
  { id: 1, label: "Win", weight: 50, color: "#FF6B6B" }, // 50% chance
  { id: 2, label: "Try Again", weight: 50, color: "#4ECDC4" }, // 50% chance
];
```

**Example 2: Rare vs Common Prizes**

```tsx
const prizes: WheelItem[] = [
  { id: 1, label: "Rare Prize", weight: 1, color: "#FF6B6B" }, // 1% chance
  { id: 2, label: "Common Prize", weight: 99, color: "#4ECDC4" }, // 99% chance
];
```

**Example 3: Multiple Probability Levels**

```tsx
const prizes: WheelItem[] = [
  { id: 1, label: "Legendary", weight: 1, color: "#FF6B6B" }, // 1% chance
  { id: 2, label: "Epic", weight: 4, color: "#FFA07A" }, // 4% chance
  { id: 3, label: "Rare", weight: 15, color: "#F7DC6F" }, // 15% chance
  { id: 4, label: "Common", weight: 80, color: "#4ECDC4" }, // 80% chance
];
// Total: 100 (1+4+15+80)
// Probabilities: 1%, 4%, 15%, 80%
```

**Example 4: Custom Percentage Distribution**

```tsx
// You can use any numbers - they're automatically normalized to percentages
const prizes: WheelItem[] = [
  { id: 1, label: "Grand Prize", weight: 5, color: "#FF6B6B" }, // 5% chance
  { id: 2, label: "Second Prize", weight: 10, color: "#4ECDC4" }, // 10% chance
  { id: 3, label: "Third Prize", weight: 15, color: "#45B7D1" }, // 15% chance
  { id: 4, label: "Consolation", weight: 70, color: "#98D8C8" }, // 70% chance
];
// Total: 100 (5+10+15+70)
// Probabilities: 5%, 10%, 15%, 70%
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
