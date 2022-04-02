
const body = document.querySelector('body'),
    html = document.querySelector('html'),
    menu = document.querySelectorAll('._burger, .header__nav, body'),
    burger = document.querySelector('._burger'),
    header = document.querySelector('.header');



let thisTarget;
body.addEventListener('click', function (event) {

    thisTarget = event.target;

    // Меню в шапке
    if (thisTarget.closest('._burger')) {
        menu.forEach(elem => {
            elem.classList.toggle('_active')
        })
    }


})


// =-=-=-=-=-=-=-=-=-=-=-=- <slider> -=-=-=-=-=-=-=-=-=-=-=-=

let servicesSlider = new Swiper('.services__slider', {
  
    spaceBetween: 30,
    slidesPerView: 1,
    centeredSlides: false,

    /* loop: true, */
    
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      1300: {
        slidesPerView: 3,
      },
      700: {
        slidesPerView: 2,
        
      },
    }
}); 

// =-=-=-=-=-=-=-=-=-=-=-=- </slider> -=-=-=-=-=-=-=-=-=-=-=-=


/* 
// =-=-=-=-=-=-=-=-=-=-=-=- <Анимации> -=-=-=-=-=-=-=-=-=-=-=-=

wow = new WOW({
mobile:       false,
})
wow.init();

// =-=-=-=-=-=-=-=-=-=-=-=- </Анимации> -=-=-=-=-=-=-=-=-=-=-=-=

*/
