/**
 * Full-bleed seigaiha wave surface — the brand kit's only decorative background.
 */
export interface WavePatternProps {
  /** lime (default) · red · moss · cream — two-tone pairings only. */
  tone?: 'lime' | 'red' | 'moss' | 'cream';
  /** Fixed band height, e.g. 120 for a header strip. Omit to size from children. */
  height?: number | string;
  /** Wave cell width in px (64 default; 40 for tight bands, 96 for hero fields). */
  cell?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
