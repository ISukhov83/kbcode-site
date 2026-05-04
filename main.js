/* KBCODE — pause the coordinate ticker on hover for legibility. */
(() => {
  const ticker = document.querySelector('.ticker-track');
  const wrap = document.querySelector('.coord-ticker');
  if (ticker && wrap) {
    wrap.addEventListener('mouseenter', () => ticker.style.animationPlayState = 'paused');
    wrap.addEventListener('mouseleave', () => ticker.style.animationPlayState = 'running');
  }
})();
