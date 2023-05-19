document.addEventListener("DOMContentLoaded", function () {

  const modals = document.querySelectorAll(".m__wrapper");
  const btns = document.querySelectorAll(".btn-open-modal");

  btns.forEach(btn => {
    btn.addEventListener("click", function () {

      modals.forEach(modal => {
        if (btn.dataset.modal == modal.dataset.modal) {
          modal.classList.add("active");
          document.body.classList.add("_scroll-lock-y");
        }
      });
    });
  });

  function handleUpDownClick(modal) {
    let downEl = null;
    let upEl = null;
    let closeBtn = null;

    modal.addEventListener("mousedown", (e) => {
      downEl = e.target.closest(".m");
      closeBtn = e.target.closest(".m-close");
    });

    modal.addEventListener("mouseup", (e) => {
      upEl = e.target.classList.contains("m__wrapper");

      if (closeBtn || (upEl && !(downEl && upEl))) {
        modal.classList.remove("active");
        document.body.classList.remove("_scroll-lock-y");
      }

    });

  }

  modals.forEach(modalEl => {
    handleUpDownClick(modalEl);
  });

});