import { Button } from '@ds/button';
import { BurgerSVG } from '@ds/icons/interface/product';
import { useEffect, useState } from 'react';

function applyNav(open: boolean) {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('nav-overlay');
  if (!sidebar || !overlay) return;
  sidebar.classList.toggle('sidebar--open', open);
  overlay.classList.toggle('overlay--visible', open);
  document.body.style.overflow = open ? 'hidden' : '';
}

export function MobileNavToggle() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const overlay = document.getElementById('nav-overlay');
    const sidebar = document.getElementById('sidebar');
    if (!overlay || !sidebar) return;

    const close = () => {
      setOpen(false);
      applyNav(false);
    };

    overlay.addEventListener('click', close);

    const links = sidebar.querySelectorAll('a');
    const onLink = () => {
      if (window.innerWidth < 768) close();
    };
    links.forEach(l => l.addEventListener('click', onLink));

    return () => {
      overlay.removeEventListener('click', close);
      links.forEach(l => l.removeEventListener('click', onLink));
    };
  }, []);

  const toggle = () => {
    const next = !open;
    setOpen(next);
    applyNav(next);
  };

  return (
    <Button
      size='s'
      view='simple'
      appearance='neutral'
      icon={<BurgerSVG />}
      onClick={toggle}
      aria-label='Toggle navigation'
      aria-expanded={open}
      aria-controls='sidebar'
    />
  );
}
