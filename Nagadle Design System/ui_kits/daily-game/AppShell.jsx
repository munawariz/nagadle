const { Icon, Mascot } = window.NagadleDesignSystem_bb132e;
const MASCOT = '../../assets/mascot-nagadle.png';

function IconAction({ name, label, active, onClick }) {
  return (
    <button onClick={onClick} aria-label={label} style={{
      display: 'grid', placeItems: 'center', width: 40, height: 40, border: 'none',
      borderRadius: 'var(--radius-pill)', background: active ? 'var(--lime-200)' : 'transparent',
      color: active ? 'var(--moss-900)' : 'var(--text-body)', cursor: 'pointer',
      transition: 'background var(--dur-fast) var(--ease-out)',
    }}>
      <Icon name={name} size={20} />
    </button>
  );
}

function AppShell({ view, onNav, children }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <header style={{
        position: 'sticky', top: 0, zIndex: 2, width: '100%', background: 'var(--cream)',
        borderBottom: '1px solid var(--border-subtle)',
      }}>
        <div style={{
          width: '100%', maxWidth: 'var(--width-screen)', margin: '0 auto',
          padding: '10px var(--pad-screen)', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <button onClick={() => onNav('home')} style={{ display: 'flex', alignItems: 'center', gap: 10, border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}>
            <Mascot src={MASCOT} size={38} />
            <span className="ngd-wordmark" style={{ fontSize: 24 }}>nagadle</span>
          </button>
          <div style={{ display: 'flex', gap: 2 }}>
            <IconAction name="chart-column" label="Stats" active={view === 'stats'} onClick={() => onNav('stats')} />
            <IconAction name="circle-help" label="How to play" active={view === 'home'} onClick={() => onNav('home')} />
          </div>
        </div>
      </header>
      <main style={{ width: '100%', maxWidth: 'var(--width-screen)', padding: 'var(--space-6) var(--pad-screen) var(--space-12)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        {children}
      </main>
    </div>
  );
}

Object.assign(window, { AppShell, IconAction, MASCOT });
