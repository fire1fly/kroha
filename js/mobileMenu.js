const menuClass = "h-nav";
const menuTriggerClass = "h-menubtn";

const menuEl = document.querySelector(`.${menuClass}`);
const menuBtnEl = document.querySelector(`.${menuTriggerClass}`);


const menuWrapper = document.querySelector(".h");
let menuWrapperHeight = menuWrapper.clientHeight;
const menuBackdrop = document.querySelector(".h-backdrop");
const menuBar = document.documentElement.clientWidth <= 520 ? document.querySelector(".h-socbar") : null;

const elToActive = [menuWrapper, menuEl, menuBackdrop];
const elToTransition = [menuEl, menuBar];
const duration = 300;

const breakpoint = menuEl.dataset.menuBreakpoint || "991";

const headerMediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);

function show(el) {
  if (el.classList.contains('collapsing')) {
    return;
  }
  el.style.display = 'flex';
  el.style.opacity = 0;
  el.style.transition = `opacity ${duration}ms ease-in-out`;
  el.classList.add('collapsing');
  window.setTimeout(() => {
    el.style.opacity = 1;
  }, 0);
  window.setTimeout(() => {
    el.classList.remove('collapsing');
    el.classList.add('show');
    el.style.display = '';
    el.style.opacity = '';
    el.style.transition = '';
  }, duration);
}

function hide(el) {
  if (el.classList.contains('collapsing')) {
    return;
  }
  el.style.opacity = 1;
  el.style.display = 'flex';
  el.style.transition = `opacity ${duration}ms ease-in-out`;
  el.classList.remove('show');
  el.classList.add('collapsing');
  window.setTimeout(() => {
    el.style.opacity = 0;
  }, 0);
  window.setTimeout(() => {
    el.classList.remove('collapsing');
    el.style.display = '';
    el.style.opacity = '';
    el.style.transition = '';
  }, duration);
}

function toggleMenu() {

  if (menuEl.classList.contains("active")) {
    menuBtnEl.classList.remove("active");
    document.body.classList.remove("_scroll-lock-y");
    elToActive.forEach(el => el.classList.remove("active"));
    elToTransition.forEach(el => {
      el && hide(el);
    });
  } else {
    menuWrapper.style.height = `${menuWrapperHeight}px`;
    menuBtnEl.classList.add("active");
    document.body.classList.add("_scroll-lock-y");
    elToActive.forEach(el => el.classList.add("active"));
    elToTransition.forEach(el => {
      el && show(el);
    });

  }

}

// not used
function handleOutsideClick(e) {
  const menu = e.target.closest(`.${menuClass}`);
  const btn = e.target.closest(`.${menuTriggerClass}`);
  const bar = e.target.closest('.h-socbar')

  if (!(menu || btn || bar)) {
    menuBtnEl.classList.remove("active");
    menuEl.classList.remove("active");
    elToActive.forEach(el => el.classList.remove("active"));
  }
}

function initMenu() {
  menuBtnEl && menuBtnEl.addEventListener("click", toggleMenu);
}

function resetMenu() {
  menuBtnEl && menuBtnEl.removeEventListener("click", toggleMenu);
}

function handleMenu(e) {
  if (e.matches) {
    initMenu();
  } else {
    resetMenu();
  }
}

headerMediaQuery.addListener(handleMenu);
handleMenu(headerMediaQuery);