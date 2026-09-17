import React from 'react';

/* "Line - Progress Bar" from the brand kit: a hand-drawn-feeling squiggle,
   faint tan for upcoming segments, yellow once reached. Pure geometry (a sine),
   generated so any width keeps the same wavelength. */
export function WaveLine({ tone = 'next', width = 160, amplitude = 4, wavelength = 30, thickness = 3, style, ...rest }) {
  const h = amplitude * 2 + thickness * 2;
  const mid = h / 2;
  const step = wavelength / 8;
  let d = `M 0 ${mid}`;
  for (let x = 0; x <= width; x += step) {
    const y = mid + Math.sin((x / wavelength) * Math.PI * 2) * amplitude;
    d += ` L ${x.toFixed(1)} ${y.toFixed(2)}`;
  }
  const stroke = tone === 'done' ? 'var(--yellow-500)' : 'var(--stone-300)';
  return (
    <svg width={width} height={h} viewBox={`0 0 ${width} ${h}`} style={{ display: 'block', overflow: 'visible', ...style }} aria-hidden="true" {...rest}>
      <path d={d} fill="none" stroke={stroke} strokeWidth={thickness} strokeLinecap="round" />
    </svg>
  );
}
