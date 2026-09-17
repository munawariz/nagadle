/**
 * The kit's content card — inactive (white + soft shadow) or active (filled deep moss).
 * @dsAdherence Every boxed content block uses Card; do not hand-roll a div with a radius and shadow.
 */
export interface CardProps {
  /** ExtraBlack heading — moss when inactive, cream when active. */
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Centred media slot at the top: <Mascot />, a large Icon, or an image. */
  media?: React.ReactNode;
  /** Bold numeric/short value in the footer (score, streak, question count). */
  meta?: React.ReactNode;
  /** Footer action — a <Button size="sm" />. On active cards use variant="warn". */
  action?: React.ReactNode;
  /** Filled deep-moss selected state, from the kit's "Card – Active". */
  active?: boolean;
  /** Show hover elevation without an onClick (e.g. wrapped in a link). */
  interactive?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
