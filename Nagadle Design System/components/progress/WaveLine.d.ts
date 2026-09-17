/**
 * The wavy progress connector from the brand kit — tan when upcoming, yellow when reached.
 */
export interface WaveLineProps {
  /** next = faint tan (default) · done = yellow. */
  tone?: 'next' | 'done';
  /** Segment length in px. */
  width?: number;
  /** Wave height in px (4 default). */
  amplitude?: number;
  /** Distance between crests in px (30 default — keep constant across a screen). */
  wavelength?: number;
  /** Stroke width in px (3 default). */
  thickness?: number;
  style?: React.CSSProperties;
}
