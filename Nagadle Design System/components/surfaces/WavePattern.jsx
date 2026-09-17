import React from 'react';

/* Seigaiha wave field from the brand kit — flat two-tone, driven by the
   .ngd-pattern utility in tokens/base.css. Used full-bleed behind headers. */
export function WavePattern({ tone = 'lime', height, cell = 64, children, style, ...rest }) {
  return (
    <div
      className="ngd-pattern"
      data-pattern={tone === 'lime' ? undefined : tone}
      style={{ ['--pattern-cell']: `${cell}px`, height, width: '100%', ...style }}
      {...rest}
    >
      {children}
    </div>
  );
}
