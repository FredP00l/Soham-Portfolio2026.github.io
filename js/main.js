// Scroll progress bar + frame counter (like a timeline playhead)
const bar = document.getElementById('progress');
const frame = document.getElementById('frame');
const TOTAL_FRAMES = 240; // the "length" of the page timeline
function onScroll(){
  const max = document.documentElement.scrollHeight - innerHeight;
  const p = max > 0 ? Math.min(scrollY / max, 1) : 0;
  bar.style.transform = `scaleX(${p})`;
  frame.textContent = 'frame ' + String(Math.max(1, Math.round(p * TOTAL_FRAMES))).padStart(3, '0');
}
addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Reveal sections as they enter view
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting){ e.target.classList.add('on'); io.unobserve(e.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Friendly message if the video file is missing
const reel = document.getElementById('reel');
if (reel && reel.tagName === 'VIDEO') {
  reel.querySelector('source').addEventListener('error', () => {
    document.getElementById('missing').hidden = false;
    reel.style.visibility = 'hidden';
  });

  // Press F while the video is focused for fullscreen
  reel.addEventListener('keydown', e => { if (e.key === 'f') reel.requestFullscreen?.(); });
}
