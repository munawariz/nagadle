/**
 * Pop-style decorative text frame — 21 treatments in the Nagadle palette.
 * @dsAdherence Use for headline plates, sticker labels and section titles; never for body copy or as a button.
 */
export interface TextFrameProps {
  /** The framed text. Per-character variants (diamonds, circles, separate, offset3d) need a plain string. */
  children: React.ReactNode;
  /**
   * overlap = solid offset block · stroke = outlined offset · box = 3D box side ·
   * strokeInside = double inner rule · dotted / striped = patterned offset shadow ·
   * sticky = sticky-note tab · rounded = pill with drop · tape = masking tape ·
   * memo = spiral memo pad · fold = folded corner · ribbon = notched ribbon ·
   * flag = flag with pole · browser = window chrome · pixel = pixel border ·
   * pin = push-pin · clip = paperclip · diamonds / circles / separate / offset3d = per character.
   */
  variant?: 'overlap' | 'stroke' | 'box' | 'strokeInside' | 'dotted' | 'striped' | 'sticky' | 'rounded'
    | 'tape' | 'memo' | 'fold' | 'ribbon' | 'flag' | 'browser' | 'pixel' | 'pin' | 'clip'
    | 'diamonds' | 'circles' | 'separate' | 'offset3d';
  /** Offset / decoration colour. lime (default) · red · yellow · moss. */
  accent?: 'lime' | 'red' | 'yellow' | 'moss';
  /** Type size in px; all geometry scales from it. 20 default, 28–40 for hero plates. */
  size?: number;
  /** Text and stroke colour. Defaults to deep moss. */
  ink?: string;
  style?: React.CSSProperties;
}
