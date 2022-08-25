resetViewportHeight();
window.addEventListener('resize', resetViewportHeight);

function resetViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
