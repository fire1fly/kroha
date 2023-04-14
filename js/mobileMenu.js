const menuClass = "h-nav";
const menuTriggerClass = "h-menubtn";

const menuEl = document.querySelector(`.${menuClass}`);
const menuBtnEl = document.querySelector(`.${menuTriggerClass}`);

const breakpoint = menuEl.dataset.menuBreakpoint || "991";

const headerMediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);


function toggleMenu() {
  menuBtnEl.classList.toggle("active");
  menuEl.classList.toggle("active");
}

function handleOutsideClick(e) {
  const menu = e.target.closest(`.${menuClass}`);
  const btn = e.target.closest(`.${menuTriggerClass}`);

  if (!(menu || btn)) {
    menuBtnEl.classList.remove("active");
    menuEl.classList.remove("active");
  }
}

function initMenu() {
  console.log("init header menu");
  menuBtnEl && menuBtnEl.addEventListener("click", toggleMenu);
  document.addEventListener("click", handleOutsideClick);
}

function resetMenu() {
  menuBtnEl && menuBtnEl.removeEventListener("click", toggleMenu);
}

function handleMenu(e) {
  if (e.matches) {
    initMenu();
  } else {
    resetMenu();
    console.log("header menu not avaliable");
  }
}

headerMediaQuery.addListener(handleMenu);
handleMenu(headerMediaQuery);