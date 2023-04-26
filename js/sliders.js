let featuresSlider = new Swiper(".ftsl-tabs-slider", {
  navigation: {
    nextEl: ".ftsl-tabs-slider-button-next",
    prevEl: ".ftsl-tabs-slider-button-prev",
  },
  mousewheel: true,
  breakpoints: {
    0: {
      direction: "horizontal",
      slidesPerView: 3,
      spaceBetween: 20,
    },
    520: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
    991: {
      direction: "vertical",
      slidesPerView: 5,
      spaceBetween: 20,
    },
  },
});