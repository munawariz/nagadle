/**
 * The Nagadle turtle mascot as a plain image, with an optional idle bob.
 */
export interface MascotProps {
  /** Path to the copied brand asset. Default assumes assets/mascot-nagadle.png next to the page. */
  src?: string;
  /** Rendered width in px. 48–72 in headers, 120–240 as a hero. */
  size?: number;
  /** Slow idle bob — hero placements only, never in lists. */
  bob?: boolean;
  alt?: string;
  style?: React.CSSProperties;
}
