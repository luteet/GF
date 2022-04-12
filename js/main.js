


const body = document.querySelector('body'),
    html = document.querySelector('html'),
    menu = document.querySelectorAll('._burger, .header__nav, body'),
    burger = document.querySelector('._burger'),
    header = document.querySelector('.header');
   
    
    
// =-=-=-=-=-=-=-=-=-=-=-=- <popup> -=-=-=-=-=-=-=-=-=-=-=-=

(function () {
  var FX = {
      easing: {
          linear: function (progress) {
              return progress;
          },
          quadratic: function (progress) {
              return Math.pow(progress, 2);
          },
          swing: function (progress) {
              return 0.5 - Math.cos(progress * Math.PI) / 2;
          },
          circ: function (progress) {
              return 1 - Math.sin(Math.acos(progress));
          },
          back: function (progress, x) {
              return Math.pow(progress, 2) * ((x + 1) * progress - x);
          },
          bounce: function (progress) {
              for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
                  if (progress >= (7 - 4 * a) / 11) {
                      return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
                  }
              }
          },
          elastic: function (progress, x) {
              return Math.pow(2, 10 * (progress - 1)) * Math.cos(20 * Math.PI * x / 3 * progress);
          }
      },
      animate: function (options) {
          var start = new Date;
          var id = setInterval(function () {
              var timePassed = new Date - start;
              var progress = timePassed / options.duration;
              if (progress > 1) {
                  progress = 1;
              }
              options.progress = progress;
              var delta = options.delta(progress);
              options.step(delta);
              if (progress == 1) {
                  clearInterval(id);
  
                  options.complete();
              }
          }, options.delay || 10);
      },
      fadeOut: function (element, options) {
          var to = 1;
          this.animate({
              duration: options.duration,
              delta: function (progress) {
                  progress = this.progress;
                  return FX.easing.swing(progress);
              },
              complete: options.complete,
              step: function (delta) {
                  element.style.opacity = to - delta;
              }
          });
      },
      fadeIn: function (element, options) {
          var to = 0;
          element.style.display = 'block';
          this.animate({
              duration: options.duration,
              delta: function (progress) {
                  progress = this.progress;
                  return FX.easing.swing(progress);
              },
              complete: options.complete,
              step: function (delta) {
                  element.style.opacity = to + delta;
              }
          });
      }
  };
  window.FX = FX;
})()

let popupCheck = true, popupCheckClose = true;
function popup(arg) {

if (popupCheck) {
    popupCheck = false;

    let popup, popupClose,

        body = arg.body,
        html = arg.html,
        header = arg.header,
        duration = (arg.duration) ? arg.duration : 200,
        id = arg.id;

    try {

        popup = document.querySelector(id);
        popupClose = popup.querySelectorAll('._popup-close');

    } catch {
        return false;
    }

    function removeFunc(popup, removeClass) {

        if (popupCheckClose) {
            popupCheckClose = false;


            FX.fadeOut(popup, {
                duration: duration,
                complete: function () {
                    popup.style.display = 'none';
                }
            });
            popup.classList.remove('_active');

            setTimeout(() => {
                popupCheckClose = true;
            }, duration)

            if (removeClass) {
                if (header) header.classList.remove('_popup-active');

                setTimeout(function () {

                    body.classList.remove('_popup-active');
                    html.style.setProperty('--popup-padding', '0px');

                }, duration)
            }
        }
    }

    body.classList.remove('_popup-active');
    html.style.setProperty('--popup-padding', window.innerWidth - body.offsetWidth + 'px');
    body.classList.add('_popup-active');

    popup.classList.add('_active');
    if (header) header.classList.add('_popup-active');


    setTimeout(function () {
        FX.fadeIn(popup, {
            duration: duration,
            complete: function () {
            }
        });
    }, duration);



    popupClose.forEach(element => {
        element.addEventListener('click', function () {
            if (document.querySelectorAll('._popup._active').length <= 1) {
                removeFunc(popup, true);
            } else {
                removeFunc(popup, false);
            }
            setTimeout(function () {
                return false;
            }, duration)
        });
    })


    setTimeout(() => {
        popupCheck = true;
    }, duration);

}

}

// =-=-=-=-=-=-=-=-=-=-=-=- </popup> -=-=-=-=-=-=-=-=-=-=-=-=



let thisTarget;
body.addEventListener('click', function (event) {

    thisTarget = event.target;

    // Меню в шапке
    if (thisTarget.closest('._burger')) {
        menu.forEach(elem => {
            elem.classList.toggle('_active')
        })
    }


    let goalsSubmit = thisTarget.closest('._goals-submit')
    if (goalsSubmit) {
      event.preventDefault();
      let goalsInputList = document.querySelectorAll('._goals-input'),
          goalsSectionStart = document.querySelector('._goals-section-start'),
          goalsSectionResult = document.querySelector('._goals-section-result');

      let goalsInputChecked = true;
      goalsInputList.forEach(goalsInput => {

        if(goalsInput.checked) {
          let goalSlide = document.querySelector(`#${goalsInput.dataset.idSlide}`);
          if(goalSlide) goalSlide.classList.add('_visible');
          goalsInputChecked = false;
        } else {
          goalsInputChecked = true;
        }

      })

      if(goalsInputChecked) {
        document.querySelectorAll(`._goals-slide`).forEach(thisElelement => {
          thisElelement.classList.add('_visible');
        })
      }


      goalsSectionStart.style.opacity = 0;
      goalsSectionStart.style.visibility = 'hidden';

      setTimeout(() => {
        goalsSectionStart.style.display = 'none';
      },300)

      setTimeout(() => {
        goalsSectionResult.style.display = 'block';
        window.scroll({
          left: 0,
          top: 0,
        })
      },600)

      setTimeout(() => {
        goalsSectionResult.style.opacity = 1;
        goalsSectionResult.style.visibility = 'visible';

      },700)

    }



    let btnPopup = thisTarget.closest('._open-popup');
    if(btnPopup) {
      event.preventDefault();

      popup({
        id: btnPopup.getAttribute('href'),
        html: html,
        body: body,
      });

    }

})


new Swiper('.services__slider', {
  
  spaceBetween: 15,
  slidesPerView: 1,
  centeredSlides: true,
  
  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    1200: {
      slidesPerView: 3,
      centeredSlides: false,
    },
    768: {
      spaceBetween: 60,
      slidesPerView: 2,
      centeredSlides: false,
    },
  }
});

