import { Button } from '@ds/button';
import { DaySVG, NightSVG } from '@ds/icons';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'ds-theme';

type Theme = 'light' | 'dark';

function readTheme(): Theme {
  return document.documentElement.classList.contains('sn-dark') ? 'dark' : 'light';
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const isDark = theme === 'dark';
  root.classList.toggle('sn-dark', isDark);
  root.classList.toggle('sn-light', !isDark);
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    setTheme(readTheme());
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
    setTheme(next);
  };

  const isDark = theme === 'dark';

  return (
    <Button
      size='m'
      view='outline'
      appearance='neutral'
      icon={isDark ? <DaySVG /> : <NightSVG />}
      onClick={toggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title='Toggle light/dark theme'
    />
  );
}
