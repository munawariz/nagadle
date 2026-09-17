import React from 'react';

/* The Nagadle turtle. Raster brand asset — pass the path to your copy of
   assets/mascot-nagadle.png; never redraw or recolour it. */
export function Mascot({
  src = 'assets/mascot-nagadle.png',
  size = 120,
  bob = false,
  alt = 'Nagadle',
  style,
  ...rest
}) {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      style={{
        width: size,
        height: 'auto',
        animation: bob ? 'ngd-bob 2.4s var(--ease-in-out) infinite' : undefined,
        ...style,
      }}
      {...rest}
    />
  );
}

if (typeof document !== 'undefined' && !document.getElementById('ngd-bob-kf')) {
  const s = document.createElement('style');
  s.id = 'ngd-bob-kf';
  s.textContent = '@keyframes ngd-bob{0%,100%{transform:translateY(0) rotate(-1deg)}50%{transform:translateY(-6px) rotate(1deg)}}';
  document.head.appendChild(s);
}
