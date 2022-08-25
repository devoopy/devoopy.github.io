const slider = new Slider();

function Slider(id = 'slider', ms = 5000) {
  const items = document.querySelectorAll(`#${id} .${id}__item`);
  const points = document.querySelectorAll(`#${id} .${id}__point`);
  let active = document.querySelector(`#${id} .${id}__point.current`) || points[0];

  for (const point of points) {
    point.onclick = click_point;
  }

  change_page(active);
  
  let timer = setInterval(next_page, ms);

  this.start = function () {
    if (!timer) {
      this.stop();
      timer = setInterval(next_page, ms);
    }
    return this;
  };

  this.stop = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    return this;
  };

  reset = (new_ms = ms) => {
    ms = new_ms;
    this.stop();
    this.start();
  };

  function change_page(next) {
    let page = active.dataset.page;
    items[page].classList.remove('current');
    active.classList.remove('current');

    active = next;
    page = active.dataset.page;
    items[page].classList.add('current');
    active.classList.add('current');
  }

  function next_page() {
    const next = active.nextElementSibling || points[0];
    change_page(next);
  }

  function click_point() {
    change_page(this);
    reset();
  }
}
