/**
 * Speech bubble spoken by the mascot — holds the question on the round screen.
 * @dsAdherence Pair with <Mascot />; the tail must point at the mascot, never float alone.
 */
export interface SpeechBubbleProps {
  children: React.ReactNode;
  /** Where the tail sits. bottom-left (default, mascot below-left) · bottom-center · left (mascot to the left). */
  tail?: 'bottom-left' | 'bottom-center' | 'left';
  /** white = default plate · moss = inverted, for win/lose lines. */
  tone?: 'white' | 'moss';
  /** Distance in px from the bubble's edge to the tail. */
  tailOffset?: number;
  style?: React.CSSProperties;
}
