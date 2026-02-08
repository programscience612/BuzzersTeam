// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');

  toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
  });
});

// Game Demo Logic (for online-version.html only)
if (document.getElementById('game-container')) {
  const container = document.getElementById('game-container');
  const ring = document.getElementById('ring');
  const status = document.getElementById('status');
  const startBtn = document.getElementById('startBtn');
  const resetBtn = document.getElementById('resetBtn');

  let playing = false;
  let startTime = 0;
  let timer = null;
  let touches = 0;

  function reset() {
    playing = false;
    touches = 0;
    clearInterval(timer);
    status.textContent = 'Press START to play';
    ring.style.left = '50px';
    ring.style.top = '50%';
  }

  function start() {
    if (playing) return;
    reset();
    playing = true;
    startTime = Date.now();
    status.textContent = 'Time: 0s | Touches: 0';

    timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      status.textContent = `Time: ${elapsed}s | Touches: ${touches}`;
    }, 1000);
  }

  function buzz() {
    touches++;
    status.style.color = '#ff3070';
    setTimeout(() => status.style.color = '#e8e8ff', 500);
  }

  function move(e) {
    if (!playing) return;
    const rect = container.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    x = Math.max(25, Math.min(rect.width - 25, x));
    y = Math.max(25, Math.min(rect.height - 25, y));
    ring.style.left = `${x}px`;
    ring.style.top = `${y}px`;

    // Simple touch detection (proximity)
    if (Math.random() < 0.05) buzz(); // Placeholder; real detection would use SVG paths
  }

  container.addEventListener('mousemove', move);
  startBtn.addEventListener('click', start);
  resetBtn.addEventListener('click', reset);

  reset();
}