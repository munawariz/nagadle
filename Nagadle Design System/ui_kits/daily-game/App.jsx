const { AppShell, HomeScreen, RoundScreen, ResultScreen, StatsScreen } = window;

function NagadleApp() {
  const [view, setView] = React.useState('home');
  const [score, setScore] = React.useState(0);
  const total = window.NAGADLE_PUZZLE.rounds.length;

  return (
    <AppShell view={view} onNav={setView}>
      {view === 'home' ? <HomeScreen onPlay={() => setView('round')} onStats={() => setView('stats')} /> : null}
      {view === 'round' ? <RoundScreen onFinish={(s) => { setScore(s); setView('result'); }} /> : null}
      {view === 'result' ? <ResultScreen score={score} total={total} onStats={() => setView('stats')} onHome={() => setView('home')} /> : null}
      {view === 'stats' ? <StatsScreen onHome={() => setView('home')} /> : null}
    </AppShell>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<NagadleApp />);
