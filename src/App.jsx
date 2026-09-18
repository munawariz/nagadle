import React from 'react';
import { Button } from '@ds/components/actions/Button.jsx';
import { Mascot } from '@ds/components/surfaces/Mascot.jsx';
import { AppShell, mascotUrl } from './components/AppShell.jsx';
import { HomeScreen } from './screens/HomeScreen.jsx';
import { RoundScreen } from './screens/RoundScreen.jsx';
import { ResultScreen } from './screens/ResultScreen.jsx';
import { StatsScreen } from './screens/StatsScreen.jsx';
import { configError, fetchDaily, fetchMembers } from './lib/api.js';
import { todayKey } from './lib/day.js';
import { getStats, isComplete, loadDay, saveDay } from './lib/progress.js';
import { STORAGE_PREFIX } from './lib/mode.js';

const MEMBERS_CACHE = `${STORAGE_PREFIX}:members`;

function cachedMembers() {
  try {
    return JSON.parse(localStorage.getItem(MEMBERS_CACHE)) ?? [];
  } catch {
    return [];
  }
}

function useDailyPuzzle() {
  const [state, setState] = React.useState(() => {
    const cached = loadDay(todayKey());
    return {
      status: cached?.prompts?.length ? 'ready' : 'loading',
      day: cached?.prompts?.length ? todayKey() : null,
      entry: cached,
      members: cachedMembers(),
      error: null,
    };
  });

  const load = React.useCallback(async () => {
    if (configError) {
      setState((s) => ({ ...s, status: 'error', error: configError }));
      return;
    }
    try {
      const [daily, members] = await Promise.all([fetchDaily(), fetchMembers()]);
      try { localStorage.setItem(MEMBERS_CACHE, JSON.stringify(members)); } catch { /* not persisted */ }
      const entry = saveDay(daily.day, { prompts: daily.prompts });
      setState({ status: 'ready', day: daily.day, entry, members, error: null });
    } catch (e) {
      setState((s) => (s.status === 'ready' ? s : { ...s, status: 'error', error: e.message }));
    }
  }, []);

  React.useEffect(() => { load(); }, [load]);

  const recordAnswer = React.useCallback((slot, result) => {
    setState((s) => ({ ...s, entry: saveDay(s.day, { answers: { [slot]: result } }) }));
  }, []);

  const recordTries = React.useCallback((slot, guesses, hints) => {
    setState((s) => ({ ...s, entry: saveDay(s.day, { tries: { [slot]: guesses }, hints: { [slot]: hints } }) }));
  }, []);

  return { ...state, reload: load, recordAnswer, recordTries };
}

function Notice({ title, body, action }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)', padding: 'var(--space-10) 0', textAlign: 'center' }}>
      <Mascot src={mascotUrl} size={140} bob alt="" />
      <h2>{title}</h2>
      {body ? <p style={{ color: 'var(--text-muted)' }}>{body}</p> : null}
      {action}
    </div>
  );
}

export function App() {
  const puzzle = useDailyPuzzle();
  const [view, setView] = React.useState('home');
  const answers = puzzle.entry?.answers ?? {};
  const answered = Object.keys(answers).length;
  const done = isComplete(puzzle.entry);
  const stats = React.useMemo(() => getStats(), [puzzle.entry]);

  const play = () => setView(done ? 'result' : 'round');
  let content;

  if (view === 'stats') {
    content = <StatsScreen stats={stats} onHome={() => setView('home')} />;
  } else if (view === 'home' || puzzle.status !== 'ready') {
    if (view !== 'home' && puzzle.status === 'loading') {
      content = <Notice title="Fetching today's five." />;
    } else if (view !== 'home' && puzzle.status === 'error') {
      content = <Notice title="Couldn't load today's puzzle." body={puzzle.error} action={<Button onClick={puzzle.reload} icon="arrow-right">Try again</Button>} />;
    } else {
      content = (
        <>
          <HomeScreen day={puzzle.day} answered={answered} streak={stats.streak} onPlay={play} onStats={() => setView('stats')} />
          {puzzle.status === 'error' ? (
            <p style={{ color: 'var(--text-error)', fontWeight: 'var(--weight-extrabold)', fontSize: 'var(--size-label)' }}>
              Couldn't load today's puzzle. {puzzle.error}
            </p>
          ) : null}
        </>
      );
    }
  } else if (view === 'round') {
    // Stays mounted after the fifth guess so its reveal shows before the result.
    content = (
      <RoundScreen
        day={puzzle.day}
        prompts={puzzle.entry.prompts}
        members={puzzle.members}
        answers={answers}
        tries={puzzle.entry.tries ?? {}}
        hints={puzzle.entry.hints ?? {}}
        onAnswer={puzzle.recordAnswer}
        onWrongTry={puzzle.recordTries}
        onFinish={() => setView('result')}
        onHome={() => setView('home')}
      />
    );
  } else if (done) {
    content = (
      <ResultScreen
        day={puzzle.day}
        prompts={puzzle.entry.prompts}
        answers={answers}
        streak={stats.streak}
        onStats={() => setView('stats')}
        onHome={() => setView('home')}
      />
    );
  } else {
    content = <HomeScreen day={puzzle.day} answered={answered} streak={stats.streak} onPlay={play} onStats={() => setView('stats')} />;
  }

  return (
    <AppShell view={view} onNav={setView}>
      {content}
    </AppShell>
  );
}
