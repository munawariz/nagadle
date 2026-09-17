import React from 'react';

/* Nagadle has no icon set of its own: the source brand kit ships hand-drawn food
   illustrations as raster art only. UI glyphs are therefore Lucide (2px stroke,
   rounded caps — the closest match to the kit's chunky rounded arrows), loaded as
   SVG masks so they inherit `currentColor`. */
const BASE = 'https://unpkg.com/lucide-static@latest/icons/';

export function Icon({ name, size = 20, color = 'currentColor', label, style, ...rest }) {
  const url = `${BASE}${name}.svg`;
  return (
    <span
      role={label ? 'img' : 'presentation'}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={{
        display: 'inline-block',
        flex: '0 0 auto',
        width: size,
        height: size,
        backgroundColor: color,
        WebkitMaskImage: `url("${url}")`,
        maskImage: `url("${url}")`,
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        ...style,
      }}
      {...rest}
    />
  );
}
