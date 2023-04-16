class Accordion {
  constructor(target, config) {
    this._el = typeof target === 'string' ? document.querySelector(target) : target;
    const defaultConfig = {
      alwaysOpen: false,
      duration: 300
    };
    this._config = Object.assign(defaultConfig, config);
    this.handle = this.handle.bind(this);
    this.addEventListener();
  }
  handle(e) {
    const elHeader = e.target.closest('.accordion-header');
    if (!elHeader) {
      return;
    }
    console.dir(this);
    if (!this._config.alwaysOpen) {
      this._el.querySelectorAll('.accordion-item_show').forEach((el) => {
        if (el.contains(elHeader.parentElement)) {
          return;
        }
        el !== elHeader.parentElement ? this.toggle(el) : null;
      });
    }
    this.toggle(elHeader.parentElement);
  }
  addEventListener() {
    this._el.addEventListener('click', this.handle);
  }
  removeEventListener() {
    this._el.removeEventListener('click', this.handle);
  }
  show(el) {
    const elBody = el.querySelector('.accordion-body');
    if (elBody.classList.contains('collapsing') || el.classList.contains('accordion-item_show')) {
      return;
    }
    elBody.style.display = 'block';
    const height = elBody.offsetHeight;
    elBody.style.height = 0;
    elBody.style.overflow = 'hidden';
    elBody.style.transition = `height ${this._config.duration}ms ease`;
    elBody.classList.add('collapsing');
    el.classList.add('accordion-item_slidedown');
    elBody.offsetHeight;
    elBody.style.height = `${height}px`;
    window.setTimeout(() => {
      elBody.classList.remove('collapsing');
      el.classList.remove('accordion-item_slidedown');
      elBody.classList.add('collapse');
      el.classList.add('accordion-item_show');
      elBody.style.display = '';
      elBody.style.height = '';
      elBody.style.transition = '';
      elBody.style.overflow = '';
    }, this._config.duration);
  }
  hide(el) {
    const elBody = el.querySelector('.accordion-body');
    if (elBody.classList.contains('collapsing') || !el.classList.contains('accordion-item_show')) {
      return;
    }
    elBody.style.height = `${elBody.offsetHeight}px`;
    elBody.offsetHeight;
    elBody.style.display = 'block';
    elBody.style.height = 0;
    elBody.style.overflow = 'hidden';
    elBody.style.transition = `height ${this._config.duration}ms ease`;
    elBody.classList.remove('collapse');
    el.classList.remove('accordion-item_show');
    elBody.classList.add('collapsing');
    window.setTimeout(() => {
      elBody.classList.remove('collapsing');
      elBody.classList.add('collapse');
      elBody.style.display = '';
      elBody.style.height = '';
      elBody.style.transition = '';
      elBody.style.overflow = '';
    }, this._config.duration);
  }
  toggle(el) {
    el.classList.contains('accordion-item_show') ? this.hide(el) : this.show(el);
  }
}

const footerAccodrdionEl = document.querySelector(".f-nav.accordion");
const footerAccordionBreakpoint = footerAccodrdionEl.dataset.accordionBreakpoint || "991";
const footerAccodrionMediaQuery = window.matchMedia(`(max-width: ${footerAccordionBreakpoint}px)`);
let footerAccodrdion = null;

function handleFooterAccodrion(e) {
  if (e.matches) {
    footerAccodrdion = new Accordion(footerAccodrdionEl);
    console.log("INIT");
  } else {
    footerAccodrdion && footerAccodrdion.removeEventListener();
    console.log("DESTROY");
  }
}

footerAccodrionMediaQuery.addListener(handleFooterAccodrion);
handleFooterAccodrion(footerAccodrionMediaQuery);