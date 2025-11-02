'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Slide from '../components/Slide';
import slides from '../data/slides';

export default function Page() {
  const [index, setIndex] = useState(0);
  const total = slides.length;

  const go = useCallback((delta) => {
    setIndex((i) => Math.min(total - 1, Math.max(0, i + delta)));
  }, [total]);

  const onKey = useCallback((e) => {
    if (e.key === 'ArrowRight' || e.key === 'PageDown') go(1);
    if (e.key === 'ArrowLeft' || e.key === 'PageUp') go(-1);
    if (e.key === 'Home') setIndex(0);
    if (e.key === 'End') setIndex(total - 1);
  }, [go, total]);

  useEffect(() => {
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onKey]);

  const progress = useMemo(() => ((index + 1) / total) * 100, [index, total]);

  const current = slides[index];

  return (
    <div className="container">
      <div className="header" role="banner">
        <div className="brand">Pregnancy and Kidney</div>
        <div className="controls" role="toolbar" aria-label="Slide controls">
          <button className="button" onClick={() => setIndex(0)} disabled={index===0} aria-label="First slide">? First</button>
          <button className="button" onClick={() => go(-1)} disabled={index===0} aria-label="Previous slide">? Prev</button>
          <button className="button" onClick={() => go(1)} disabled={index===total-1} aria-label="Next slide">Next ?</button>
          <button className="button" onClick={() => setIndex(total-1)} disabled={index===total-1} aria-label="Last slide">? Last</button>
        </div>
      </div>
      <hr className="sep" />

      <div className="deck" onClick={() => go(1)} role="region" aria-label={`Slide ${index+1} of ${total}`}>
        <Slide slide={current} />
        <div className="footer">
          <div>
            <span className="note">Slide {index + 1} / {total}</span>
            <span className="note" style={{marginLeft:12}}>
              Keys: <kbd>?</kbd>/<kbd>?</kbd>, <kbd>Home</kbd>, <kbd>End</kbd>
            </span>
          </div>
          <div style={{minWidth:160}} className="progress-bar" aria-label="Progress">
            <div className="progress" style={{width: `${progress}%`}}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
