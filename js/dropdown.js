document.addEventListener("DOMContentLoaded", function () {
  class Dropdown {
    constructor(el) {
      this.$dd = el;
      this.$input = el.querySelector(".dd-input");
      this.$selectedItem = el.querySelector(".selected")
      this.ddElems = el.querySelectorAll(".dd-item");
      this.setup();
    }

    setup() {
      this.handleClick = this.handleClick.bind(this);
      this.handleOutClick = this.handleOutClick.bind(this);
      this.$dd.addEventListener("click", this.handleClick);
      document.addEventListener("click", this.handleOutClick);

      if (this.$dd.classList.contains("select")) {
        this.setInitState();
      }

    }

    setInitState() {
      this.ddElems.forEach(elem => {
        if (elem.dataset.value === this.$input.value) {
          this.$selectedItem.innerHTML = elem.innerHTML;
        }
      });
    }

    handleClick(e) {

      if (this.$dd.classList.contains("select")) {
        const clickedItem = e.target.closest(".dd-item");

        if (clickedItem) {
          this.$selectedItem.innerHTML = clickedItem.innerHTML;
          this.$input.value = clickedItem.dataset.value;
          this.$input.dispatchEvent(new Event("change"));
        }
      }

      if (this.$dd.classList.contains("active")) {
        this.close();
      } else {
        this.open();
      }

    }

    handleOutClick(e) {
      let path = e.path || (e.composedPath && e.composedPath());
      if (path) {
        if (!path.includes(this.$dd)) {
          this.close();
        }
      }
    }

    open() {
      this.$dd.classList.add("active");
    }

    close() {
      this.$dd.classList.remove("active");
    }

    toggle() {
      this.$dd.classList.toggle("active");
    }
  }

  const ddElems = document.querySelectorAll(".dd");

  ddElems && ddElems.forEach(el => {
    const dd = new Dropdown(el);
  });

});