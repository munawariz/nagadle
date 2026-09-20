import React from 'react';

/* A one-off confetti burst in the brand palette, drawn on a canvas over the whole page.
   Purely decorative: no pointer events, hidden from screen readers, and skipped entirely
   when the player asked for reduced motion. It falls, it lands, it stops — nothing loops. */

const COLORS = ['var(--lime-500)', 'var(--yellow-500)', 'var(--red-500)', 'var(--moss-700)', 'var(--lime-200)'];
const PIECES = 90;
const GRAVITY = 0.28;
const DRAG = 0.992;
const FADE_AFTER = 2600; // ms of falling before pieces start to dissolve
const LIFE = 4200;

const rand = (min, max) => min + Math.random() * (max - min);

// The canvas needs real colours, and the palette lives in CSS custom properties.
function resolve(colors) {
  const styles = getComputedStyle(document.documentElement);
  return colors.map((c) => {
    const name = c.startsWith('var(') ? c.slice(4, -1) : null;
    return (name ? styles.getPropertyValue(name).trim() : c) || '#BCD147';
  });
}

function makePiece(width, colors) {
  const fromLeft = Math.random() < 0.5;
  return {
    // Two fountains, one from each bottom corner, thrown up and inwards.
    x: fromLeft ? rand(-20, width * 0.25) : rand(width * 0.75, width + 20),
    y: rand(0.55, 0.85),
    vx: (fromLeft ? 1 : -1) * rand(2, 9),
    vy: rand(-19, -11),
    w: rand(6, 12),
    h: rand(8, 16),
    spin: rand(-0.22, 0.22),
    angle: rand(0, Math.PI * 2),
    wobble: rand(0, Math.PI * 2),
    color: colors[Math.floor(Math.random() * colors.length)],
    strip: Math.random() < 0.35, // some pieces are thin streamers
  };
}

/** `trigger` starts a burst: mount, and again whenever the value changes. */
export function Confetti({ trigger = 0 }) {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = resolve(COLORS);
    const pieces = Array.from({ length: PIECES }, () => {
      const p = makePiece(width, colors);
      return { ...p, y: height * p.y };
    });

    const start = performance.now();
    let frame = requestAnimationFrame(function draw(now) {
      const elapsed = now - start;
      ctx.clearRect(0, 0, width, height);

      for (const p of pieces) {
        p.vx *= DRAG;
        p.vy = p.vy * DRAG + GRAVITY;
        p.wobble += 0.08;
        p.x += p.vx + Math.sin(p.wobble) * 0.9;
        p.y += p.vy;
        p.angle += p.spin;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.globalAlpha = elapsed < FADE_AFTER ? 1 : Math.max(0, 1 - (elapsed - FADE_AFTER) / (LIFE - FADE_AFTER));
        ctx.fillStyle = p.color;
        // The spin flattens each piece, so it reads as paper rather than a floating block.
        ctx.fillRect(-p.w / 2, -p.h / 2, p.strip ? p.w / 3 : p.w, p.h * Math.abs(Math.cos(p.wobble)));
        ctx.restore();
      }

      if (elapsed < LIFE && pieces.some((p) => p.y < height + 40)) {
        frame = requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, [trigger]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 50 }}
    />
  );
}
