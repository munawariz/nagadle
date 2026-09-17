/**
 * Nagadle UI glyph, rendered from the Lucide static set as a colour-inheriting mask.
 */
export interface IconProps {
  /** Lucide icon slug, e.g. "arrow-right", "x", "check", "flame". */
  name: string;
  /** Box size in px. 16 for inline labels, 20 in buttons, 24+ for standalone. */
  size?: number;
  /** Any CSS colour; defaults to currentColor. */
  color?: string;
  /** Accessible name. Omit for decorative icons (renders aria-hidden). */
  label?: string;
  style?: React.CSSProperties;
}
