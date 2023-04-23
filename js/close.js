const closeElList = document.querySelectorAll(".to-close");

function handleClose(el, timeout) {
  el.classList.add("closing");
  setTimeout(() => {
    el.remove();
  }, timeout);
}

closeElList.forEach(el => {
  let timeout = Number(el.dataset.timeout) || 300;
  el.addEventListener("click", () => handleClose(el, timeout))
});