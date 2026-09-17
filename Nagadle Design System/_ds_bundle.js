/* @ds-bundle: {"format":4,"namespace":"NagadleDesignSystem_bb132e","components":[{"name":"ArrowLink","sourcePath":"components/actions/ArrowLink.jsx"},{"name":"Button","sourcePath":"components/actions/Button.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"TextFrame","sourcePath":"components/frames/TextFrame.jsx"},{"name":"Icon","sourcePath":"components/icon/Icon.jsx"},{"name":"StepDots","sourcePath":"components/progress/StepDots.jsx"},{"name":"WaveLine","sourcePath":"components/progress/WaveLine.jsx"},{"name":"Card","sourcePath":"components/surfaces/Card.jsx"},{"name":"Mascot","sourcePath":"components/surfaces/Mascot.jsx"},{"name":"SpeechBubble","sourcePath":"components/surfaces/SpeechBubble.jsx"},{"name":"WavePattern","sourcePath":"components/surfaces/WavePattern.jsx"}],"sourceHashes":{"components/actions/ArrowLink.jsx":"b4919f087716","components/actions/Button.jsx":"c6beaf5f1549","components/forms/Input.jsx":"5174005ba6f3","components/frames/TextFrame.jsx":"af7861cb0fb5","components/icon/Icon.jsx":"2281eef0c186","components/progress/StepDots.jsx":"7343e4bc567b","components/progress/WaveLine.jsx":"92804069ce54","components/surfaces/Card.jsx":"604dc44d0d7e","components/surfaces/Mascot.jsx":"336127fd003e","components/surfaces/SpeechBubble.jsx":"45a23affb33c","components/surfaces/WavePattern.jsx":"5952fa33c003","ui_kits/daily-game/App.jsx":"8a71af426540","ui_kits/daily-game/AppShell.jsx":"0e0322370e46","ui_kits/daily-game/HomeScreen.jsx":"80c3182bbc35","ui_kits/daily-game/ResultScreen.jsx":"950f788eeeb2","ui_kits/daily-game/RoundScreen.jsx":"96a2880d4d37","ui_kits/daily-game/StatsScreen.jsx":"bf257e9e0d42","ui_kits/daily-game/data.js":"97d0c1470621"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.NagadleDesignSystem_bb132e = window.NagadleDesignSystem_bb132e || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/frames/TextFrame.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Pop-style text frames, Nagadle palette: cream/white plate, moss stroke, one accent
   offset. Every variant is built from geometry (borders, clip-path, gradients) —
   no imagery. `variant` picks the treatment; `accent` picks the offset colour. */

const ACCENTS = {
  lime: 'var(--lime-500)',
  red: 'var(--red-500)',
  yellow: 'var(--yellow-500)',
  moss: 'var(--moss-700)'
};
const PER_CHAR = ['diamonds', 'circles', 'separate', 'offset3d'];
function TextFrame({
  children,
  variant = 'overlap',
  accent = 'lime',
  size = 20,
  ink = 'var(--moss-900)',
  style,
  ...rest
}) {
  const a = ACCENTS[accent] || ACCENTS.lime;
  const text = typeof children === 'string' ? children : '';
  const stroke = 3;
  const pad = `${Math.round(size * 0.5)}px ${Math.round(size * 1.05)}px`;
  const base = {
    position: 'relative',
    display: 'inline-block',
    fontFamily: 'var(--font-display)',
    fontWeight: 'var(--weight-black)',
    fontSize: size,
    lineHeight: 1.15,
    color: ink,
    letterSpacing: '0.01em',
    whiteSpace: 'nowrap'
  };

  /* ---- per-character variants ---- */
  if (PER_CHAR.includes(variant)) {
    const chars = [...text];
    if (variant === 'diamonds') {
      return /*#__PURE__*/React.createElement("span", _extends({
        style: {
          ...base,
          display: 'inline-flex',
          alignItems: 'center',
          ...style
        }
      }, rest), chars.map((c, i) => /*#__PURE__*/React.createElement("span", {
        key: i,
        style: {
          width: size * 1.9,
          height: size * 1.9,
          marginLeft: i ? -size * 0.42 : 0,
          background: 'var(--white)',
          border: `${stroke}px solid ${ink}`,
          transform: 'rotate(45deg)',
          display: 'grid',
          placeItems: 'center',
          boxSizing: 'border-box'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          transform: 'rotate(-45deg)'
        }
      }, c))));
    }
    if (variant === 'circles') {
      return /*#__PURE__*/React.createElement("span", _extends({
        style: {
          ...base,
          display: 'inline-flex',
          alignItems: 'center',
          ...style
        }
      }, rest), chars.map((c, i) => /*#__PURE__*/React.createElement("span", {
        key: i,
        style: {
          width: size * 2.1,
          height: size * 2.1,
          marginLeft: i ? -size * 0.3 : 0,
          background: 'var(--white)',
          border: `${stroke}px solid ${ink}`,
          borderRadius: '50%',
          display: 'grid',
          placeItems: 'center',
          boxSizing: 'border-box',
          boxShadow: `0 ${Math.round(size * 0.3)}px 0 ${a}`
        }
      }, c)));
    }
    if (variant === 'separate') {
      return /*#__PURE__*/React.createElement("span", _extends({
        style: {
          ...base,
          display: 'inline-flex',
          alignItems: 'center',
          gap: Math.round(size * 0.5),
          ...style
        }
      }, rest), chars.map((c, i) => /*#__PURE__*/React.createElement("span", {
        key: i,
        style: {
          padding: `${Math.round(size * 0.35)}px ${Math.round(size * 0.45)}px`,
          background: 'var(--white)',
          border: `${stroke}px solid ${ink}`,
          borderRadius: 3,
          boxShadow: `${Math.round(size * 0.25)}px ${Math.round(size * 0.25)}px 0 ${a}, ${Math.round(size * 0.25)}px ${Math.round(size * 0.25)}px 0 ${stroke}px ${ink}`
        }
      }, c)));
    }
    return /*#__PURE__*/React.createElement("span", _extends({
      style: {
        ...base,
        display: 'inline-flex',
        alignItems: 'center',
        ...style
      }
    }, rest), chars.map((c, i) => {
      const filled = i % 3 === 2;
      return /*#__PURE__*/React.createElement("span", {
        key: i,
        style: {
          padding: `${Math.round(size * 0.4)}px ${Math.round(size * 0.55)}px`,
          marginLeft: i ? -stroke : 0,
          background: filled ? a : 'var(--white)',
          color: filled ? 'var(--white)' : ink,
          border: `${stroke}px solid ${ink}`,
          transform: `rotate(${(i % 2 ? 4 : -5) + i % 3 * 1.5}deg) translateY(${i % 2 ? 3 : -2}px)`,
          boxShadow: `${Math.round(size * 0.2)}px ${Math.round(size * 0.2)}px 0 -1px var(--white), ${Math.round(size * 0.2)}px ${Math.round(size * 0.2)}px 0 ${stroke - 1}px ${ink}`
        }
      }, c);
    }));
  }

  /* ---- single-plate variants ---- */
  const off = Math.round(size * 0.42);
  let plate = {
    padding: pad,
    background: 'var(--white)',
    border: `${stroke}px solid ${ink}`,
    position: 'relative',
    zIndex: 1,
    display: 'block'
  };
  let behind = null;
  let front = null;
  const offsetLayer = (bg, extra = {}) => ({
    position: 'absolute',
    left: off,
    top: off,
    right: -off,
    bottom: -off,
    background: bg,
    ...extra
  });
  switch (variant) {
    case 'overlap':
      plate = {
        ...plate,
        border: 'none'
      };
      behind = /*#__PURE__*/React.createElement("span", {
        style: offsetLayer(a)
      });
      break;
    case 'stroke':
      behind = /*#__PURE__*/React.createElement("span", {
        style: offsetLayer(a, {
          border: `${stroke}px solid ${ink}`,
          left: off,
          top: off
        })
      });
      break;
    case 'box':
      plate = {
        ...plate,
        boxShadow: `${off}px ${off}px 0 -1px var(--white), ${off}px ${off}px 0 ${stroke - 1}px ${ink}`
      };
      break;
    case 'strokeInside':
      plate = {
        ...plate,
        padding: `${Math.round(size * 0.7)}px ${Math.round(size * 1.3)}px`,
        boxShadow: `inset 0 0 0 ${Math.round(size * 0.22)}px var(--white), inset 0 0 0 ${Math.round(size * 0.22) + 2}px ${ink}`
      };
      break;
    case 'dotted':
      behind = /*#__PURE__*/React.createElement("span", {
        style: offsetLayer('transparent', {
          backgroundImage: `radial-gradient(${a} 40%, transparent 42%)`,
          backgroundSize: '8px 8px'
        })
      });
      break;
    case 'striped':
      behind = /*#__PURE__*/React.createElement("span", {
        style: offsetLayer('transparent', {
          backgroundImage: `repeating-linear-gradient(45deg, ${a} 0 5px, transparent 5px 10px)`
        })
      });
      break;
    case 'sticky':
      plate = {
        ...plate,
        border: 'none',
        paddingLeft: Math.round(size * 2.4)
      };
      behind = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
        style: offsetLayer(a)
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: Math.round(size * 1.5),
          background: a,
          zIndex: 2
        }
      }));
      break;
    case 'rounded':
      plate = {
        ...plate,
        borderRadius: 'var(--radius-pill)',
        padding: `${Math.round(size * 0.55)}px ${Math.round(size * 1.4)}px`,
        boxShadow: `0 ${off}px 0 ${a}`
      };
      break;
    case 'tape':
      {
        const lightTape = accent === 'lime' || accent === 'yellow';
        const tapeBg = accent === 'moss' ? 'var(--moss-900)' : a;
        plate = {
          ...plate,
          border: 'none',
          color: lightTape ? 'var(--moss-950)' : 'var(--cream)',
          backgroundColor: tapeBg,
          backgroundImage: `repeating-linear-gradient(45deg, ${lightTape ? 'rgba(43,48,17,.16)' : 'rgba(255,255,255,.3)'} 0 8px, transparent 8px 16px)`,
          clipPath: 'polygon(0 4%, 100% 0, 99% 96%, 1% 100%)',
          padding: `${Math.round(size * 0.6)}px ${Math.round(size * 1.3)}px`
        };
        break;
      }
    case 'memo':
      behind = /*#__PURE__*/React.createElement("span", {
        style: offsetLayer(a, {
          top: off,
          left: off
        })
      });
      front = /*#__PURE__*/React.createElement("span", {
        style: {
          position: 'absolute',
          top: -Math.round(size * 0.62),
          left: Math.round(size * 0.6),
          right: Math.round(size * 0.6),
          display: 'flex',
          justifyContent: 'space-between',
          zIndex: 3
        }
      }, Array.from({
        length: 7
      }).map((_, i) => /*#__PURE__*/React.createElement("span", {
        key: i,
        style: {
          width: Math.round(size * 0.34),
          height: Math.round(size * 0.85),
          border: `${stroke - 1}px solid ${ink}`,
          borderRadius: 'var(--radius-pill)',
          background: 'transparent'
        }
      })));
      break;
    case 'fold':
      plate = {
        ...plate,
        clipPath: `polygon(0 0, calc(100% - ${size}px) 0, 100% ${size}px, 100% 100%, 0 100%)`
      };
      front = /*#__PURE__*/React.createElement("span", {
        style: {
          position: 'absolute',
          right: 0,
          top: 0,
          width: size,
          height: size,
          background: a,
          clipPath: 'polygon(0 0, 100% 100%, 0 100%)',
          zIndex: 2
        }
      });
      behind = /*#__PURE__*/React.createElement("span", {
        style: offsetLayer(a, {
          left: off,
          top: off,
          clipPath: `polygon(0 0, calc(100% - ${size}px) 0, 100% ${size}px, 100% 100%, 0 100%)`
        })
      });
      break;
    case 'ribbon':
      plate = {
        ...plate,
        clipPath: `polygon(0 0, 100% 0, calc(100% - ${size}px) 50%, 100% 100%, 0 100%, ${size}px 50%)`,
        padding: `${Math.round(size * 0.5)}px ${Math.round(size * 1.9)}px`
      };
      behind = /*#__PURE__*/React.createElement("span", {
        style: offsetLayer(a, {
          left: off,
          top: off,
          clipPath: `polygon(0 0, 100% 0, calc(100% - ${size}px) 50%, 100% 100%, 0 100%, ${size}px 50%)`
        })
      });
      break;
    case 'flag':
      plate = {
        ...plate,
        clipPath: `polygon(0 0, 100% 0, calc(100% - ${size}px) 50%, 100% 100%, 0 100%)`,
        padding: `${Math.round(size * 0.5)}px ${Math.round(size * 1.9)}px ${Math.round(size * 0.5)}px ${Math.round(size * 1.05)}px`
      };
      front = /*#__PURE__*/React.createElement("span", {
        style: {
          position: 'absolute',
          left: stroke,
          top: '100%',
          width: stroke,
          height: Math.round(size * 1.6),
          background: ink,
          zIndex: 0
        }
      });
      break;
    case 'browser':
      plate = {
        ...plate,
        padding: 0,
        background: 'var(--white)'
      };
      front = null;
      return /*#__PURE__*/React.createElement("span", _extends({
        style: {
          ...base,
          ...style
        }
      }, rest), /*#__PURE__*/React.createElement("span", {
        style: plate
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 4,
          padding: `${Math.round(size * 0.22)}px ${Math.round(size * 0.35)}px`,
          borderBottom: `${stroke}px solid ${ink}`
        }
      }, [a, a, a].map((c, i) => /*#__PURE__*/React.createElement("span", {
        key: i,
        style: {
          width: Math.round(size * 0.3),
          height: Math.round(size * 0.3),
          borderRadius: '50%',
          background: c,
          border: `1px solid ${ink}`
        }
      }))), /*#__PURE__*/React.createElement("span", {
        style: {
          display: 'block',
          padding: `${Math.round(size * 0.45)}px ${Math.round(size * 1.05)}px`,
          background: 'var(--moss-900)',
          color: 'var(--cream)'
        }
      }, children)));
    case 'pixel':
      {
        const s = Math.max(4, Math.round(size * 0.22));
        const nub = pos => ({
          position: 'absolute',
          width: s * 2,
          height: s * 2,
          background: ink,
          zIndex: 2,
          ...pos
        });
        behind = /*#__PURE__*/React.createElement("span", {
          style: offsetLayer(a, {
            left: off,
            top: off
          })
        });
        front = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
          style: nub({
            left: -s,
            top: -s
          })
        }), /*#__PURE__*/React.createElement("span", {
          style: nub({
            right: -s,
            top: -s
          })
        }), /*#__PURE__*/React.createElement("span", {
          style: nub({
            left: -s,
            bottom: -s
          })
        }), /*#__PURE__*/React.createElement("span", {
          style: nub({
            right: -s,
            bottom: -s
          })
        }));
        break;
      }
    case 'pin':
      behind = /*#__PURE__*/React.createElement("span", {
        style: offsetLayer(a, {
          left: off,
          top: off
        })
      });
      front = /*#__PURE__*/React.createElement("span", {
        style: {
          position: 'absolute',
          left: -Math.round(size * 0.45),
          top: -Math.round(size * 0.5),
          width: Math.round(size * 1.5),
          height: Math.round(size * 1.5),
          borderRadius: '50%',
          background: a,
          border: `${stroke}px solid ${ink}`,
          zIndex: 3
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          position: 'absolute',
          left: '22%',
          top: '18%',
          width: '32%',
          height: '32%',
          borderRadius: '50%',
          background: 'var(--white)'
        }
      }));
      break;
    case 'clip':
      behind = /*#__PURE__*/React.createElement("span", {
        style: offsetLayer(a, {
          left: off,
          top: off
        })
      });
      front = /*#__PURE__*/React.createElement("span", {
        style: {
          position: 'absolute',
          left: Math.round(size * 0.9),
          top: -Math.round(size * 1.1),
          width: Math.round(size * 0.72),
          height: Math.round(size * 2.1),
          border: `${stroke - 1}px solid ${ink}`,
          borderRadius: 'var(--radius-pill)',
          zIndex: 3,
          transform: 'rotate(-14deg)',
          background: 'transparent'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          position: 'absolute',
          left: '26%',
          top: '18%',
          width: '48%',
          height: '64%',
          border: `${stroke - 1}px solid ${ink}`,
          borderRadius: 'var(--radius-pill)',
          borderBottomColor: 'transparent'
        }
      }));
      break;
    default:
      break;
  }
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      ...base,
      ...style
    }
  }, rest), behind, /*#__PURE__*/React.createElement("span", {
    style: plate
  }, children), front);
}
Object.assign(__ds_scope, { TextFrame });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/frames/TextFrame.jsx", error: String((e && e.message) || e) }); }

// components/icon/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Nagadle has no icon set of its own: the source brand kit ships hand-drawn food
   illustrations as raster art only. UI glyphs are therefore Lucide (2px stroke,
   rounded caps — the closest match to the kit's chunky rounded arrows), loaded as
   SVG masks so they inherit `currentColor`. */
const BASE = 'https://unpkg.com/lucide-static@latest/icons/';
function Icon({
  name,
  size = 20,
  color = 'currentColor',
  label,
  style,
  ...rest
}) {
  const url = `${BASE}${name}.svg`;
  return /*#__PURE__*/React.createElement("span", _extends({
    role: label ? 'img' : 'presentation',
    "aria-label": label,
    "aria-hidden": label ? undefined : true,
    style: {
      display: 'inline-block',
      flex: '0 0 auto',
      width: size,
      height: size,
      backgroundColor: color,
      WebkitMaskImage: `url("${url}")`,
      maskImage: `url("${url}")`,
      WebkitMaskSize: 'contain',
      maskSize: 'contain',
      WebkitMaskRepeat: 'no-repeat',
      maskRepeat: 'no-repeat',
      WebkitMaskPosition: 'center',
      maskPosition: 'center',
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/icon/Icon.jsx", error: String((e && e.message) || e) }); }

// components/actions/ArrowLink.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* The brand kit's two link treatments: an underlined text link with a leading
   arrow, and the same link inside a filled pill for use over busy surfaces. */
function ArrowLink({
  children,
  href = '#',
  variant = 'plain',
  direction = 'back',
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const chip = variant === 'chip';
  const glyph = direction === 'back' ? 'arrow-left' : 'arrow-right';
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--gap-inline)',
      flexDirection: direction === 'back' ? 'row' : 'row-reverse',
      padding: chip ? '6px 14px' : 0,
      borderRadius: chip ? 'var(--radius-pill)' : 0,
      background: chip ? hover ? 'var(--moss-700)' : 'var(--moss-900)' : 'transparent',
      color: chip ? 'var(--cream)' : hover ? 'var(--text-link-hover)' : 'var(--text-link)',
      fontWeight: 'var(--weight-extrabold)',
      fontSize: 'var(--size-body)',
      lineHeight: 1.2,
      textDecoration: 'none',
      transition: 'background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: glyph,
    size: 16
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      textDecoration: 'underline',
      textDecorationThickness: 2,
      textUnderlineOffset: 3
    }
  }, children));
}
Object.assign(__ds_scope, { ArrowLink });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/ArrowLink.jsx", error: String((e && e.message) || e) }); }

// components/actions/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Pill button from the Nagadle brand kit: uppercase ExtraBold label, wide tracking,
   trailing glyph, flat fill. Hover lightens the fill and adds a coloured glow;
   press darkens it. No borders, no gradients, no scale transforms. */
const VARIANTS = {
  primary: {
    fill: 'var(--action-primary)',
    hover: 'var(--action-primary-hover)',
    press: 'var(--action-primary-press)',
    ink: 'var(--action-primary-ink)',
    glyph: 'var(--moss-900)',
    glow: 'rgba(188,209,71,0.55)'
  },
  danger: {
    fill: 'var(--action-danger)',
    hover: 'var(--action-danger-hover)',
    press: 'var(--action-danger-press)',
    ink: 'var(--action-danger-ink)',
    glyph: 'var(--yellow-500)',
    glow: 'rgba(255,78,66,0.45)'
  },
  warn: {
    fill: 'var(--action-warn)',
    hover: 'var(--action-warn-hover)',
    press: 'var(--action-warn-press)',
    ink: 'var(--action-warn-ink)',
    glyph: 'var(--red-500)',
    glow: 'rgba(255,192,36,0.5)'
  },
  moss: {
    fill: 'var(--moss-900)',
    hover: 'var(--moss-700)',
    press: 'var(--moss-950)',
    ink: 'var(--cream)',
    glyph: 'var(--lime-500)',
    glow: 'rgba(73,79,33,0.4)'
  }
};
const SIZES = {
  sm: {
    padding: '9px 16px',
    fontSize: 'var(--size-label)',
    gap: 'var(--space-3)',
    icon: 16
  },
  md: {
    padding: 'var(--pad-button)',
    fontSize: 'var(--size-body)',
    gap: 'var(--space-5)',
    icon: 20
  }
};
function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon = 'arrow-right',
  fullWidth = false,
  disabled = false,
  type = 'button',
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const v = VARIANTS[variant] || VARIANTS.primary;
  const s = SIZES[size] || SIZES.md;
  const fill = disabled ? 'var(--stone-300)' : press ? v.press : hover ? v.hover : v.fill;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      display: fullWidth ? 'flex' : 'inline-flex',
      width: fullWidth ? '100%' : undefined,
      alignItems: 'center',
      justifyContent: icon ? 'space-between' : 'center',
      gap: s.gap,
      padding: s.padding,
      border: 'none',
      borderRadius: 'var(--radius-pill)',
      background: fill,
      color: disabled ? 'var(--text-muted)' : v.ink,
      fontFamily: 'var(--font-core)',
      fontWeight: 'var(--weight-extrabold)',
      fontSize: s.fontSize,
      lineHeight: 1,
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      cursor: disabled ? 'not-allowed' : 'pointer',
      boxShadow: hover && !disabled && !press ? `0 6px 20px ${v.glow}` : 'none',
      transition: `background var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)`,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", null, children), icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: s.icon,
    color: disabled ? 'var(--text-muted)' : v.glyph
  }) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Button.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Text field from the brand kit: ExtraBold label above, 2px-stroke rounded field,
   moss stroke on focus, cherry stroke plus a glyph + message on error. */
function Input({
  label,
  value,
  defaultValue,
  placeholder,
  error,
  disabled = false,
  type = 'text',
  id,
  onChange,
  onKeyDown,
  inputStyle,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const autoId = React.useId();
  const fieldId = id || autoId;
  const stroke = error ? 'var(--border-error)' : focus ? 'var(--border-active)' : 'var(--border-subtle)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-2)',
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      fontWeight: 'var(--weight-extrabold)',
      fontSize: 'var(--size-body)',
      color: 'var(--text-strong)'
    }
  }, label) : null, /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    type: type,
    value: value,
    defaultValue: defaultValue,
    placeholder: placeholder,
    disabled: disabled,
    onChange: onChange,
    onKeyDown: onKeyDown,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    "aria-invalid": error ? true : undefined,
    style: {
      width: '100%',
      padding: 'var(--pad-field)',
      background: disabled ? 'var(--surface-sunken)' : 'var(--white)',
      border: `var(--stroke-field) solid ${stroke}`,
      borderRadius: 'var(--radius-field)',
      fontFamily: 'var(--font-core)',
      fontWeight: 'var(--weight-medium)',
      fontSize: 'var(--size-body-lg)',
      color: 'var(--text-body)',
      outline: 'none',
      transition: 'border-color var(--dur) var(--ease-out)',
      ...inputStyle
    }
  }, rest)), error ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-1)',
      color: 'var(--text-error)',
      fontSize: 'var(--size-label)',
      fontWeight: 'var(--weight-extrabold)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "circle-x",
    size: 14
  }), error) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/progress/StepDots.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* "Progress Bar Elements" from the brand kit: faint ring (next), thick yellow ring
   (current), filled yellow with a check (completed). */
const RING = {
  next: {
    border: 'var(--stroke-tile) solid var(--border-subtle)',
    background: 'transparent'
  },
  current: {
    border: '3px solid var(--yellow-500)',
    background: 'transparent'
  },
  done: {
    border: '3px solid var(--yellow-500)',
    background: 'var(--yellow-500)'
  }
};
function StepDots({
  steps = [],
  size = 18,
  orientation = 'vertical',
  style,
  ...rest
}) {
  const vertical = orientation === 'vertical';
  return /*#__PURE__*/React.createElement("ol", _extends({
    style: {
      display: 'flex',
      flexDirection: vertical ? 'column' : 'row',
      alignItems: vertical ? 'flex-start' : 'center',
      gap: vertical ? 'var(--space-3)' : 'var(--space-2)',
      margin: 0,
      padding: 0,
      listStyle: 'none',
      ...style
    }
  }, rest), steps.map((step, i) => {
    const state = step.state || 'next';
    return /*#__PURE__*/React.createElement("li", {
      key: i,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      "aria-label": state,
      style: {
        width: size,
        height: size,
        borderRadius: 'var(--radius-pill)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: '0 0 auto',
        transition: 'background var(--dur) var(--ease-out), border-color var(--dur) var(--ease-out)',
        ...RING[state]
      }
    }, state === 'done' ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "check",
      size: Math.round(size * 0.6),
      color: "var(--white)"
    }) : null), step.label ? /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--size-body)',
        color: state === 'next' ? 'var(--text-muted)' : 'var(--text-body)'
      }
    }, step.label) : null);
  }));
}
Object.assign(__ds_scope, { StepDots });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/progress/StepDots.jsx", error: String((e && e.message) || e) }); }

// components/progress/WaveLine.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* "Line - Progress Bar" from the brand kit: a hand-drawn-feeling squiggle,
   faint tan for upcoming segments, yellow once reached. Pure geometry (a sine),
   generated so any width keeps the same wavelength. */
function WaveLine({
  tone = 'next',
  width = 160,
  amplitude = 4,
  wavelength = 30,
  thickness = 3,
  style,
  ...rest
}) {
  const h = amplitude * 2 + thickness * 2;
  const mid = h / 2;
  const step = wavelength / 8;
  let d = `M 0 ${mid}`;
  for (let x = 0; x <= width; x += step) {
    const y = mid + Math.sin(x / wavelength * Math.PI * 2) * amplitude;
    d += ` L ${x.toFixed(1)} ${y.toFixed(2)}`;
  }
  const stroke = tone === 'done' ? 'var(--yellow-500)' : 'var(--stone-300)';
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: width,
    height: h,
    viewBox: `0 0 ${width} ${h}`,
    style: {
      display: 'block',
      overflow: 'visible',
      ...style
    },
    "aria-hidden": "true"
  }, rest), /*#__PURE__*/React.createElement("path", {
    d: d,
    fill: "none",
    stroke: stroke,
    strokeWidth: thickness,
    strokeLinecap: "round"
  }));
}
Object.assign(__ds_scope, { WaveLine });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/progress/WaveLine.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Card from the brand kit: white on cream with a soft shadow when inactive, filled
   deep-moss with cream ink when active. Media sits centred at the top, footer pairs
   a bold meta value with one action. */
function Card({
  title,
  description,
  media,
  meta,
  action,
  active = false,
  interactive = false,
  onClick,
  style,
  children,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const clickable = interactive || typeof onClick === 'function';
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    role: clickable ? 'button' : undefined,
    tabIndex: clickable ? 0 : undefined,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--gap-stack)',
      padding: 'var(--pad-card)',
      borderRadius: 'var(--radius-md)',
      background: active ? 'var(--surface-card-active)' : 'var(--surface-card)',
      color: active ? 'var(--text-inverse)' : 'var(--text-body)',
      boxShadow: active ? 'none' : hover && clickable ? 'var(--shadow-card-hover)' : 'var(--shadow-card)',
      cursor: clickable ? 'pointer' : 'default',
      transition: 'background var(--dur) var(--ease-out), box-shadow var(--dur) var(--ease-out)',
      ...style
    }
  }, rest), media ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 'var(--space-2) 0 var(--space-4)'
    }
  }, media) : null, title ? /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontWeight: 'var(--weight-black)',
      fontSize: 'var(--size-heading)',
      lineHeight: 'var(--lh-snug)',
      color: active ? 'var(--text-inverse)' : 'var(--text-accent)'
    }
  }, title) : null, description ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--size-body-lg)',
      lineHeight: 'var(--lh-body)',
      color: 'inherit',
      maxWidth: 'none'
    }
  }, description) : null, children, meta || action ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--gap-group)',
      marginTop: 'var(--space-2)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ngd-numeric",
    style: {
      fontSize: 'var(--size-body-lg)',
      color: active ? 'var(--text-inverse)' : 'var(--text-price)'
    }
  }, meta), action) : null);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Card.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Mascot.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* The Nagadle turtle. Raster brand asset — pass the path to your copy of
   assets/mascot-nagadle.png; never redraw or recolour it. */
function Mascot({
  src = 'assets/mascot-nagadle.png',
  size = 120,
  bob = false,
  alt = 'Nagadle',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("img", _extends({
    src: src,
    alt: alt,
    width: size,
    style: {
      width: size,
      height: 'auto',
      animation: bob ? 'ngd-bob 2.4s var(--ease-in-out) infinite' : undefined,
      ...style
    }
  }, rest));
}
if (typeof document !== 'undefined' && !document.getElementById('ngd-bob-kf')) {
  const s = document.createElement('style');
  s.id = 'ngd-bob-kf';
  s.textContent = '@keyframes ngd-bob{0%,100%{transform:translateY(0) rotate(-1deg)}50%{transform:translateY(-6px) rotate(1deg)}}';
  document.head.appendChild(s);
}
Object.assign(__ds_scope, { Mascot });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Mascot.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/SpeechBubble.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Speech bubble for the mascot: white plate, 16px radius, soft moss shadow,
   flat triangular tail. Moss tone inverts it for the mascot's louder moments. */
function SpeechBubble({
  children,
  tail = 'bottom-left',
  tone = 'white',
  tailOffset = 32,
  style,
  ...rest
}) {
  const bg = tone === 'moss' ? 'var(--surface-card-active)' : 'var(--surface-card)';
  const ink = tone === 'moss' ? 'var(--text-inverse)' : 'var(--text-body)';
  const size = 18;
  const tailBase = {
    position: 'absolute',
    width: 0,
    height: 0,
    borderStyle: 'solid'
  };
  const tails = {
    'bottom-left': {
      ...tailBase,
      left: tailOffset,
      top: '100%',
      borderWidth: `${size}px ${size}px 0 0`,
      borderColor: `${bg} transparent transparent transparent`
    },
    'bottom-center': {
      ...tailBase,
      left: '50%',
      marginLeft: -size / 2,
      top: '100%',
      borderWidth: `${size}px ${size / 2}px 0 ${size / 2}px`,
      borderColor: `${bg} transparent transparent transparent`
    },
    left: {
      ...tailBase,
      right: '100%',
      top: tailOffset,
      borderWidth: `0 ${size}px ${size}px 0`,
      borderColor: `transparent ${bg} transparent transparent`
    }
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: 'relative',
      padding: 'var(--space-5) var(--space-6)',
      background: bg,
      color: ink,
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-card)',
      ...style
    }
  }, rest), children, /*#__PURE__*/React.createElement("span", {
    style: tails[tail] || tails['bottom-left']
  }));
}
Object.assign(__ds_scope, { SpeechBubble });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/SpeechBubble.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/WavePattern.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Seigaiha wave field from the brand kit — flat two-tone, driven by the
   .ngd-pattern utility in tokens/base.css. Used full-bleed behind headers. */
function WavePattern({
  tone = 'lime',
  height,
  cell = 64,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: "ngd-pattern",
    "data-pattern": tone === 'lime' ? undefined : tone,
    style: {
      ['--pattern-cell']: `${cell}px`,
      height,
      width: '100%',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { WavePattern });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/WavePattern.jsx", error: String((e && e.message) || e) }); }

// ui_kits/daily-game/App.jsx
try { (() => {
const {
  AppShell,
  HomeScreen,
  RoundScreen,
  ResultScreen,
  StatsScreen
} = window;
function NagadleApp() {
  const [view, setView] = React.useState('home');
  const [score, setScore] = React.useState(0);
  const total = window.NAGADLE_PUZZLE.rounds.length;
  return /*#__PURE__*/React.createElement(AppShell, {
    view: view,
    onNav: setView
  }, view === 'home' ? /*#__PURE__*/React.createElement(HomeScreen, {
    onPlay: () => setView('round'),
    onStats: () => setView('stats')
  }) : null, view === 'round' ? /*#__PURE__*/React.createElement(RoundScreen, {
    onFinish: s => {
      setScore(s);
      setView('result');
    }
  }) : null, view === 'result' ? /*#__PURE__*/React.createElement(ResultScreen, {
    score: score,
    total: total,
    onStats: () => setView('stats'),
    onHome: () => setView('home')
  }) : null, view === 'stats' ? /*#__PURE__*/React.createElement(StatsScreen, {
    onHome: () => setView('home')
  }) : null);
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(NagadleApp, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/daily-game/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/daily-game/AppShell.jsx
try { (() => {
const {
  Icon,
  Mascot
} = window.NagadleDesignSystem_bb132e;
const MASCOT = '../../assets/mascot-nagadle.png';
function IconAction({
  name,
  label,
  active,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    "aria-label": label,
    style: {
      display: 'grid',
      placeItems: 'center',
      width: 40,
      height: 40,
      border: 'none',
      borderRadius: 'var(--radius-pill)',
      background: active ? 'var(--lime-200)' : 'transparent',
      color: active ? 'var(--moss-900)' : 'var(--text-body)',
      cursor: 'pointer',
      transition: 'background var(--dur-fast) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: name,
    size: 20
  }));
}
function AppShell({
  view,
  onNav,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 2,
      width: '100%',
      background: 'var(--cream)',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      maxWidth: 'var(--width-screen)',
      margin: '0 auto',
      padding: '10px var(--pad-screen)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onNav('home'),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      border: 'none',
      background: 'none',
      padding: 0,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Mascot, {
    src: MASCOT,
    size: 38
  }), /*#__PURE__*/React.createElement("span", {
    className: "ngd-wordmark",
    style: {
      fontSize: 24
    }
  }, "nagadle")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement(IconAction, {
    name: "chart-column",
    label: "Stats",
    active: view === 'stats',
    onClick: () => onNav('stats')
  }), /*#__PURE__*/React.createElement(IconAction, {
    name: "circle-help",
    label: "How to play",
    active: view === 'home',
    onClick: () => onNav('home')
  })))), /*#__PURE__*/React.createElement("main", {
    style: {
      width: '100%',
      maxWidth: 'var(--width-screen)',
      padding: 'var(--space-6) var(--pad-screen) var(--space-12)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-6)'
    }
  }, children));
}
Object.assign(window, {
  AppShell,
  IconAction,
  MASCOT
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/daily-game/AppShell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/daily-game/HomeScreen.jsx
try { (() => {
const {
  Button,
  ArrowLink,
  Card,
  Mascot,
  WavePattern,
  StepDots
} = window.NagadleDesignSystem_bb132e;
function HomeScreen({
  onPlay,
  onStats
}) {
  const p = window.NAGADLE_PUZZLE;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(WavePattern, {
    height: 150,
    style: {
      borderRadius: 'var(--radius-md)',
      position: 'relative',
      display: 'grid',
      placeItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Mascot, {
    src: window.MASCOT,
    size: 150,
    bob: true,
    style: {
      marginTop: -18
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'var(--size-display)'
    }
  }, "Five questions. One a day."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--size-body-lg)'
    }
  }, "Answer today's five before midnight. Keep the streak, feed the turtle.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    fullWidth: true,
    onClick: onPlay
  }, "Play today"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ngd-numeric",
    style: {
      fontSize: 'var(--size-body)',
      color: 'var(--text-muted)'
    }
  }, "#", p.number, " \xB7 ", p.date), /*#__PURE__*/React.createElement(ArrowLink, {
    direction: "forward",
    href: "#stats",
    onClick: e => {
      e.preventDefault();
      onStats();
    }
  }, "Your stats"))), /*#__PURE__*/React.createElement(Card, {
    title: "How it works",
    description: "One question at a time, four answers, no going back. Lime means you got it, red means you didn't \u2014 either way you move on.",
    meta: "Streak 12",
    action: /*#__PURE__*/React.createElement(StepDots, {
      orientation: "horizontal",
      size: 14,
      steps: [{
        state: 'done'
      }, {
        state: 'done'
      }, {
        state: 'current'
      }, {
        state: 'next'
      }, {
        state: 'next'
      }]
    })
  }));
}
Object.assign(window, {
  HomeScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/daily-game/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/daily-game/ResultScreen.jsx
try { (() => {
const {
  Button,
  Card,
  Input,
  Mascot,
  WavePattern,
  StepDots,
  ArrowLink,
  Icon
} = window.NagadleDesignSystem_bb132e;
function Countdown() {
  const [left, setLeft] = React.useState(() => 6 * 3600 + 11 * 60 + 9);
  React.useEffect(() => {
    const t = setInterval(() => setLeft(s => s > 0 ? s - 1 : 0), 1000);
    return () => clearInterval(t);
  }, []);
  const h = String(Math.floor(left / 3600)).padStart(2, '0');
  const m = String(Math.floor(left % 3600 / 60)).padStart(2, '0');
  const s = String(left % 60).padStart(2, '0');
  return /*#__PURE__*/React.createElement("span", {
    className: "ngd-numeric"
  }, h, ":", m, ":", s);
}
function ResultScreen({
  score,
  total,
  onStats,
  onHome
}) {
  const [shared, setShared] = React.useState(false);
  const verdict = score === total ? 'Clean sweep.' : score >= total - 1 ? 'So close.' : score >= 2 ? 'Not bad.' : 'Rough one.';
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(WavePattern, {
    tone: "moss",
    height: 160,
    style: {
      borderRadius: 'var(--radius-md)',
      display: 'grid',
      placeItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Mascot, {
    src: window.MASCOT,
    size: 140
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-2)'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'var(--size-display)'
    }
  }, verdict), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--size-body-lg)'
    }
  }, "You got ", /*#__PURE__*/React.createElement("span", {
    className: "ngd-numeric"
  }, score), " of ", /*#__PURE__*/React.createElement("span", {
    className: "ngd-numeric"
  }, total), " on puzzle #", window.NAGADLE_PUZZLE.number, ".")), /*#__PURE__*/React.createElement(Card, {
    active: true,
    title: "Streak kept",
    description: "Come back tomorrow before midnight and it keeps going.",
    meta: /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "flame",
      size: 18,
      color: "var(--yellow-500)"
    }), "12 days"),
    action: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "warn",
      icon: shared ? 'check' : 'share-2',
      onClick: () => setShared(true)
    }, shared ? 'Copied' : 'Share')
  }), shared ? /*#__PURE__*/React.createElement(Input, {
    label: "Copied to your clipboard",
    value: `Nagadle #${window.NAGADLE_PUZZLE.number} · ${score}/${total} · streak 12`,
    readOnly: true,
    inputStyle: {
      fontWeight: 'var(--weight-extrabold)'
    }
  }) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ngd-label",
    style: {
      color: 'var(--text-muted)'
    }
  }, "Today's answers"), /*#__PURE__*/React.createElement(StepDots, {
    orientation: "horizontal",
    size: 18,
    steps: Array.from({
      length: total
    }, (_, i) => ({
      state: i < score ? 'done' : 'next'
    }))
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 'var(--space-4)',
      background: 'var(--surface-tile)',
      borderRadius: 'var(--radius-md)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ngd-label"
  }, "Next puzzle"), /*#__PURE__*/React.createElement(Countdown, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    fullWidth: true,
    icon: "chart-column",
    onClick: onStats
  }, "See your stats"), /*#__PURE__*/React.createElement(ArrowLink, {
    href: "#home",
    onClick: e => {
      e.preventDefault();
      onHome();
    }
  }, "Back to today")));
}
Object.assign(window, {
  ResultScreen,
  Countdown
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/daily-game/ResultScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/daily-game/RoundScreen.jsx
try { (() => {
const {
  Button,
  Card,
  StepDots,
  WaveLine,
  ArrowLink,
  Icon,
  SpeechBubble,
  Mascot
} = window.NagadleDesignSystem_bb132e;

/* Progress rail: step dots joined by the kit's wavy connector. */
function RoundRail({
  total,
  index,
  results
}) {
  const items = [];
  for (let i = 0; i < total; i += 1) {
    const state = results[i] != null ? 'done' : i === index ? 'current' : 'next';
    items.push(/*#__PURE__*/React.createElement(StepDots, {
      key: `d${i}`,
      orientation: "horizontal",
      size: 16,
      steps: [{
        state
      }]
    }));
    if (i < total - 1) items.push(/*#__PURE__*/React.createElement(WaveLine, {
      key: `w${i}`,
      tone: results[i] != null ? 'done' : 'next',
      width: 44
    }));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4
    }
  }, items);
}
function RoundScreen({
  onFinish
}) {
  const rounds = window.NAGADLE_PUZZLE.rounds;
  const [index, setIndex] = React.useState(0);
  const [picked, setPicked] = React.useState(null);
  const [locked, setLocked] = React.useState(false);
  const [results, setResults] = React.useState([]);
  const round = rounds[index];
  const correct = picked === round.answer;
  function submit() {
    if (locked) {
      const next = index + 1;
      const tally = [...results];
      tally[index] = correct;
      setResults(tally);
      setPicked(null);
      setLocked(false);
      if (next >= rounds.length) onFinish(tally.filter(Boolean).length);else setIndex(next);
      return;
    }
    setLocked(true);
    const tally = [...results];
    tally[index] = picked === round.answer;
    setResults(tally);
  }
  function optionStyle(i) {
    if (!locked) return null;
    if (i === round.answer) return {
      background: 'var(--state-correct)',
      color: 'var(--state-correct-ink)',
      boxShadow: 'none'
    };
    if (i === picked) return {
      background: 'var(--state-wrong)',
      color: 'var(--state-wrong-ink)',
      boxShadow: 'none'
    };
    return {
      opacity: 0.45
    };
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement(RoundRail, {
    total: rounds.length,
    index: index,
    results: results
  }), /*#__PURE__*/React.createElement("span", {
    className: "ngd-label",
    style: {
      color: 'var(--text-muted)'
    }
  }, index + 1, " of ", rounds.length)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement(SpeechBubble, {
    tail: "bottom-left",
    tailOffset: 36
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 26,
      lineHeight: 1.2
    }
  }, round.q)), /*#__PURE__*/React.createElement(Mascot, {
    src: window.MASCOT,
    size: 88,
    style: {
      marginTop: 18,
      marginLeft: 14
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)'
    }
  }, round.options.map((opt, i) => /*#__PURE__*/React.createElement(Card, {
    key: opt,
    active: !locked && picked === i,
    onClick: locked ? undefined : () => setPicked(i),
    style: {
      padding: '16px 20px',
      gap: 0,
      ...(optionStyle(i) || {})
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 'var(--weight-extrabold)',
      fontSize: 'var(--size-body-lg)'
    }
  }, opt), locked && i === round.answer ? /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 20,
    color: "var(--moss-900)"
  }) : null, locked && i === picked && i !== round.answer ? /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 20,
    color: "var(--white)"
  }) : null)))), locked ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      alignItems: 'flex-start',
      padding: 'var(--space-4)',
      background: 'var(--surface-tile)',
      borderRadius: 'var(--radius-md)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: correct ? 'check' : 'circle-help',
    size: 18,
    color: "var(--moss-900)"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--size-body)',
      margin: 0
    }
  }, round.fact)) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    fullWidth: true,
    disabled: picked === null,
    onClick: submit
  }, locked ? index + 1 === rounds.length ? 'See result' : 'Next question' : 'Lock it in'), /*#__PURE__*/React.createElement(ArrowLink, {
    href: "#home",
    onClick: e => {
      e.preventDefault();
      onFinish(results.filter(Boolean).length);
    }
  }, "Give up for today")));
}
Object.assign(window, {
  RoundScreen,
  RoundRail
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/daily-game/RoundScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/daily-game/StatsScreen.jsx
try { (() => {
const {
  Button,
  Card,
  ArrowLink,
  WaveLine,
  Icon
} = window.NagadleDesignSystem_bb132e;
function StatBlock({
  value,
  label
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      minWidth: 72
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ngd-numeric",
    style: {
      fontSize: 28,
      lineHeight: 1
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    className: "ngd-label",
    style: {
      color: 'var(--text-muted)'
    }
  }, label));
}
function StatsScreen({
  onHome
}) {
  const s = window.NAGADLE_STATS;
  const max = Math.max(...s.distribution.map(d => d.count));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-2)'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'var(--size-display)'
    }
  }, "Your record"), /*#__PURE__*/React.createElement(WaveLine, {
    tone: "done",
    width: 180
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(StatBlock, {
    value: s.played,
    label: "Played"
  }), /*#__PURE__*/React.createElement(StatBlock, {
    value: `${s.winRate}%`,
    label: "Perfect"
  }), /*#__PURE__*/React.createElement(StatBlock, {
    value: s.streak,
    label: "Streak"
  }), /*#__PURE__*/React.createElement(StatBlock, {
    value: s.best,
    label: "Best"
  })), /*#__PURE__*/React.createElement(Card, {
    title: "Score spread",
    description: "How today's five usually go for you."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-2)',
      marginTop: 'var(--space-2)'
    }
  }, s.distribution.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: d.label,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ngd-numeric",
    style: {
      fontSize: 'var(--size-label)',
      width: 26,
      color: 'var(--text-muted)'
    }
  }, d.label), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 18,
      background: 'var(--surface-sunken)',
      borderRadius: 'var(--radius-sm)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${Math.max(6, d.count / max * 100)}%`,
      height: '100%',
      background: i === 0 ? 'var(--lime-500)' : 'var(--lime-400)',
      borderRadius: 'var(--radius-sm)'
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "ngd-numeric",
    style: {
      fontSize: 'var(--size-label)',
      width: 22,
      textAlign: 'right'
    }
  }, d.count))))), /*#__PURE__*/React.createElement(Card, {
    title: "Streak watch",
    description: "Nineteen more days to beat your best run.",
    meta: /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "flame",
      size: 18,
      color: "var(--red-500)"
    }), "12 / 31"),
    action: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "danger",
      icon: "x"
    }, "Reset")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    fullWidth: true,
    variant: "moss",
    icon: "calendar-days"
  }, "Browse the archive"), /*#__PURE__*/React.createElement(ArrowLink, {
    href: "#home",
    onClick: e => {
      e.preventDefault();
      onHome();
    }
  }, "Back to today")));
}
Object.assign(window, {
  StatsScreen,
  StatBlock
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/daily-game/StatsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/daily-game/data.js
try { (() => {
/* Fake content for the Nagadle daily-game recreation. */
const NAGADLE_PUZZLE = {
  number: 218,
  date: 'Thursday, 17 September',
  prompt: 'Which of these is a real Japanese wave pattern?',
  rounds: [{
    q: 'Which of these is a real Japanese wave pattern?',
    options: ['Seigaiha', 'Kumadori', 'Tatamiji', 'Nanohana'],
    answer: 0,
    fact: 'Seigaiha — overlapping arcs, first used on ancient maps.'
  }, {
    q: 'A turtle in Japanese folklore lives how many years?',
    options: ['100', '1,000', '10,000', 'Forever'],
    answer: 2,
    fact: 'Ten thousand — cranes get a thousand, turtles get ten.'
  }, {
    q: 'Which soup base is clearest?',
    options: ['Tonkotsu', 'Shio', 'Miso', 'Tantan'],
    answer: 1,
    fact: 'Shio: salt broth, barely cloudy.'
  }, {
    q: 'Nagadle drops at which hour, everywhere?',
    options: ['Midnight local', '09:00 JST', 'Midnight UTC', 'Whenever'],
    answer: 0,
    fact: 'Midnight, your clock. Everyone gets the same five.'
  }, {
    q: 'What ends a Nagadle streak?',
    options: ['One wrong answer', 'A missed day', 'Two missed days', 'Nothing'],
    answer: 1,
    fact: 'Miss a day and the streak resets. Wrong answers just cost points.'
  }]
};
const NAGADLE_STATS = {
  played: 96,
  winRate: 84,
  streak: 12,
  best: 31,
  distribution: [{
    label: '5/5',
    count: 41
  }, {
    label: '4/5',
    count: 28
  }, {
    label: '3/5',
    count: 14
  }, {
    label: '2/5',
    count: 8
  }, {
    label: '1/5',
    count: 3
  }, {
    label: '0/5',
    count: 2
  }]
};
Object.assign(window, {
  NAGADLE_PUZZLE,
  NAGADLE_STATS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/daily-game/data.js", error: String((e && e.message) || e) }); }

__ds_ns.ArrowLink = __ds_scope.ArrowLink;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.TextFrame = __ds_scope.TextFrame;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.StepDots = __ds_scope.StepDots;

__ds_ns.WaveLine = __ds_scope.WaveLine;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Mascot = __ds_scope.Mascot;

__ds_ns.SpeechBubble = __ds_scope.SpeechBubble;

__ds_ns.WavePattern = __ds_scope.WavePattern;

})();
