'use strict';
const FULLPAGE = 'js-fullpage';
const MENU = 'js-menu';
const CURSOR = 'js-cursor';
const LOADER = 'js-loader';
const BACKGROUND = 'js-background';

window.addEventListener('DOMContentLoaded', mousemove_handler);
window.addEventListener('DOMContentLoaded', hashchange_handler);
window.addEventListener('hashchange', hashchange_handler);
window.addEventListener('load', loader);
window.addEventListener('load', wheel_handler);
window.addEventListener('load', keydown_handler);
window.addEventListener('load', touchmove_handler);
const fullpage = document.getElementById(FULLPAGE);
const sections = document.querySelectorAll(`#${FULLPAGE} > *`);
const menu_anchors = document.querySelectorAll(`#${MENU} a`);
const cursor = document.getElementById(CURSOR);
let hash = window.location.hash;
let current = set_current(hash);

function hashchange_handler() {
  hash = window.location.hash;
  current = set_current(hash);
  set_active();
}

function set_current(anchor) {
  let result = '';
  if (anchor === '') {
    result = fullpage.firstElementChild;
  } else {
      try {
      result = document.querySelector(`#${FULLPAGE} ${anchor}`);
    } catch {
      result = fullpage.firstElementChild;
    }
    result = result || fullpage.firstElementChild;
  }
  return result;
}

function set_active() {
  for (const anchor of menu_anchors) {
    if (anchor.hash === '#' + current.id) {
      anchor.classList.add('active');
    } else {
      anchor.classList.remove('active');
    }
  }

  for (const section of sections) {
    section.classList.remove('active');
  }
  current.classList.add('active');
}

function wheel_handler() {
  window.addEventListener('wheel', (event) => {
    if (event.defaultPrevented) return;

    scroll_page(event.deltaY);
    event.preventDefault();
  },{ passive: false });
}

function keydown_handler() {
  window.addEventListener('keydown', (event) => {
    switch (event.code) {
      case 'KeyS':
      case 'ArrowDown':
        scroll_page(1);
        break;
      case 'KeyW':
      case 'ArrowUp':
        scroll_page(-1);
        break;
      case 'KeyA':
      case 'ArrowLeft':
        scroll_page(-1);
        break;
      case 'KeyD':
      case 'ArrowRight':
        scroll_page(1);
        break;
    }
  });
}

function touchmove_handler() {
  let startY;
  window.addEventListener('touchstart', (event) => {
    startY = event.touches[0].clientY;
  });
  window.addEventListener('touchmove', (event) => {
    const deltaY = startY - event.changedTouches[0].clientY;
    if (deltaY > 50 || deltaY < -50) {
      scroll_page(deltaY);
    }
  });
}

function mousemove_handler() {
  document.addEventListener('mousemove', (event) => {
    cursor.style.background = `radial-gradient(
      circle 30vw at ${event.clientX}px ${event.clientY}px, 
      rgba(200, 0, 200, 0.9) 0%, transparent 100%
    )`;
  });
}

let animation_playing = false;

async function scroll_page(deltaY) {
  if (animation_playing === true) return;

  if (deltaY > 0) {
    const next = current.nextElementSibling;
    if (next !== null) {
      current = next;
    } else return;
  } else if (deltaY < 0) {
    const previous = current.previousElementSibling;
    if (previous !== null) {
      current = previous;
    } else return;
  } else return;

  animation_playing = true;
  window.location.hash = current.id;
  await sleep(1000);
  animation_playing = false;
  return true;
}

function loader() {
  document.getElementById(LOADER).style.display = 'none';
  document.getElementById(BACKGROUND).style.zIndex = '0';
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
