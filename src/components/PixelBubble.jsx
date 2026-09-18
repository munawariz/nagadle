import React from 'react';

/* Pixel-style speech bubble (the "ピクセル風" frame) in Nagadle colours: white plate,
   deep-moss pixel border with stepped corners, lime offset shadow, and a pixel tail
   pointing down at the mascot. Built from the design tokens; the design system's
   SpeechBubble is the smooth variant. */

const U = 4; // one "pixel"
const STEPS = 2; // stair steps per corner

// Clip path for a box inset by `inset` px with stair-stepped corners.
function steppedClip(inset) {
  const c = STEPS * U;
  const stairs = [];
  for (let k = 0; k < STEPS; k += 1) {
    stairs.push([inset + k * U, inset + c - k * U], [inset + (k + 1) * U, inset + c - k * U]);
  }
  stairs.push([inset + c, inset]);
  const px = (v) => `${v}px`;
  const from = (v) => `calc(100% - ${v}px)`;
  const pts = [
    ...stairs.map(([x, y]) => `${px(x)} ${px(y)}`),
    ...[...stairs].reverse().map(([x, y]) => `${from(x)} ${px(y)}`),
    ...stairs.map(([x, y]) => `${from(x)} ${from(y)}`),
    ...[...stairs].reverse().map(([x, y]) => `${px(x)} ${from(y)}`),
  ];
  return `polygon(${pts.join(', ')})`;
}

const OUTER = steppedClip(0);
const INNER = steppedClip(U);

// '#' = ink, 'o' = plate. Row 0 sits on the bubble's bottom border to open it up.
const TAIL = ['#oooooo#', '#ooooo#', '#oooo#', '#ooo#', '#oo#', '#o#', '##'];
const TAIL_W = TAIL[0].length * U;
const TAIL_H = TAIL.length * U;
const SHADOW = 2 * U;

// flip: slant the tail the other way (straight edge on the right).
function PixelTail({ accent, ink, x, flip }) {
  const cells = [];
  TAIL.forEach((row, rowIndex) => {
    const pad = flip ? TAIL[0].length - row.length : 0;
    [...row].forEach((ch, colIndex) => {
      cells.push({ x: (pad + colIndex) * U, y: rowIndex * U, ch });
    });
  });
  return (
    <svg
      width={TAIL_W + SHADOW}
      height={TAIL_H + SHADOW}
      shapeRendering="crispEdges"
      aria-hidden="true"
      style={{ position: 'absolute', top: `calc(100% - ${U}px)`, left: x, marginLeft: -U, overflow: 'visible' }}
    >
      {cells.map((c) => (
        <rect key={`s${c.x}-${c.y}`} x={c.x + SHADOW} y={c.y + SHADOW} width={U} height={U} style={{ fill: accent }} />
      ))}
      {cells.map((c) => (
        <rect key={`c${c.x}-${c.y}`} x={c.x} y={c.y} width={U} height={U} style={{ fill: c.ch === '#' ? ink : 'var(--surface-card)' }} />
      ))}
    </svg>
  );
}

/** tailX: where the tail's left edge sits, as a CSS length from the bubble's left edge.
    tailFlip mirrors the tail so it leans left instead of right. */
export function PixelBubble({
  children, accent = 'var(--lime-500)', ink = 'var(--moss-900)', tailX = '50%', tailFlip = false,
  padding = 'var(--space-5) var(--space-6)', style, ...rest
}) {
  const layer = { position: 'absolute', inset: 0 };
  return (
    <div style={{ position: 'relative', marginRight: SHADOW, marginBottom: TAIL_H, ...style }} {...rest}>
      <div aria-hidden="true" style={{ ...layer, transform: `translate(${SHADOW}px, ${SHADOW}px)`, background: accent, clipPath: OUTER }} />
      <div aria-hidden="true" style={{ ...layer, background: ink, clipPath: OUTER }} />
      <div aria-hidden="true" style={{ ...layer, background: 'var(--surface-card)', clipPath: INNER }} />
      <PixelTail accent={accent} ink={ink} x={tailX} flip={tailFlip} />
      <div style={{ position: 'relative', padding }}>{children}</div>
    </div>
  );
}
