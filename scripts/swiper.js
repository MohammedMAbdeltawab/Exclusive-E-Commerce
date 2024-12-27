/**swiper slide side-bar */

var swiper = new Swiper(".slide-swp", {
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
      clickable: true,
    },
    autoplay: {
      delay: 2500,
    },
    loop: true,
  });

  var swiper = new Swiper(".sale_sec", {
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
      clickable: true,
    },
    slidesPerView:5,
    spaceBetween:30,
    autoplay: {
      delay: 3000,
    },
    navigation:{
      nextEl:".swiper-button-next",
      prevEl:".swiper-button-prev"
    },
    loop: true,
  });

var slideIndex = 0;
setInterval(
  function(){
    var sliderItem = document.getElementById("sliderItem");
    sliderItem.setAttribute("src", `./img/slider-0${slideIndex + 1}.jpg`);
    slideIndex++;
    slideIndex %= 3;
  },
  2500
);

