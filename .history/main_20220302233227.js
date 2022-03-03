/* let slideshow = document.querySelector(".slideshow");
let slides = document.querySelectorAll(".slideshow .slide");
let bars = document.querySelectorAll(".bars .bar");
let dots = document.querySelectorAll(".nav-dots .dot a");
let slideTitles = document.querySelectorAll(".slide-title");
let easeInOutQuart = "cubic-bezier(0.77, 0, 0.175, 1)";
let easeOutCubic = "cubic-bezier(0.215, 0.61, 0.355, 1)";

let staggeredSlideIn = (element, delay) => {
  return element.animate(
    [
      { transform: "scaleY(0)", transformOrigin: "top" },
      { transform: "scaleY(1)", transformOrigin: "top" }
    ],
    {
      duration: 800,
      easing: easeInOutQuart,
      fill: "forwards",
      delay: 80 * delay
    }
  );
};

let staggeredSlideOut = (element, delay) => {
  return element.animate(
    [
      { transform: "scaleY(1)", transformOrigin: "top" },
      { transformOrigin: "bottom", offset: 0.001 },
      { transform: "scaleY(0)", transformOrigin: "bottom" }
    ],
    {
      duration: 800,
      easing: easeInOutQuart,
      fill: "forwards",
      delay: 80 * delay
    }
  );
};

let fadeIn = (element) => {
  return element.animate(
    [
      { opacity: 0, transform: "translateY(100%)" },
      { opacity: 1, transform: "translateY(0)" }
    ],
    {
      duration: 800,
      easing: easeOutCubic,
      fill: "forwards",
      delay: 350
    }
  );
};

let fadeOut = (element) => {
  return element.animate(
    [
      { opacity: 1, transform: "translateY(0)" },
      { opacity: 0, transform: "translateY(-100%)" }
    ],
    {
      duration: 600,
      easing: easeOutCubic,
      fill: "forwards"
    }
  );
};

let pageTransition = (activeIndex) => {
  slideTitles.forEach(slideTitle => fadeOut(slideTitle));
  Promise.all(
    Array.from(bars).map((bar, i) => staggeredSlideIn(bar, i).finished)
  ).then(() => {
    setActiveIndex(activeIndex);
    bars.forEach((bar, i) => {
      staggeredSlideOut(bar, i);
    });
    slideTitles.forEach(slideTitle => fadeIn(slideTitle));
  });
};

let setActiveIndex = (activeIndex) => {
  dots.forEach(dot => dot.classList.remove("active"));
  dots[activeIndex].classList.add("active");
  slideshow.style.setProperty(
    "--active-index",
    `${activeIndex}`
  );
  slides.forEach(slide => (slide.style.zIndex = `-1`));
  slides[activeIndex].style.zIndex = `0`;
};

// dots
dots[0].classList.add("active");
dots.forEach((dot, activeIndex) => {
  dot.addEventListener("click", () => {
    let currentActiveIndex = slideshow.style.getPropertyValue(
      "--active-index"
    );
    if (Number(currentActiveIndex) !== activeIndex) {
      pageTransition(activeIndex);
    }
  });
});
 */

$(document).ready(function() {
  
    var pages = $(".page").length,
        scrolling = false,
        curPage = 1;
    
    function pagination(page, movingUp) {
      scrolling = true;
      var diff = curPage - page,
          oldPage = curPage;
      curPage = page;
      $(".page").removeClass("active small previous");
      $(".page-" + page).addClass("active");
      $(".nav-btn").removeClass("active");
      $(".nav-page" + page).addClass("active");
      if (page > 1) {
        $(".page-" + (page - 1)).addClass("previous");
        if (movingUp) {
          $(".page-" + (page - 1)).hide();
          var hackPage = page;
          setTimeout(function() {
            $(".page-" + (hackPage - 1)).show();
          }, 600);
        }
        while (--page) {
          $(".page-" + page).addClass("small");
        }
      }
      console.log(diff)
      if (diff > 1) {
        for (var j = page + 1; j < oldPage; j++) {
          $(".page-" + j + " .half").css("transition", "transform .7s ease-out");
        }
      }
      setTimeout(function() {
        scrolling = false;
        $(".page .half").attr("style", "");
        $(".page")
      }, 700);
    }
    
    function navigateUp() {
      if (curPage > 1) {
        curPage--;
        pagination(curPage, true);
      }
    }
  
    function navigateDown() {
      if (curPage < pages) {
        curPage++;
        pagination(curPage);
      }
    }
    
    $(document).on("mousewheel DOMMouseScroll", function(e) {
      if (!scrolling) {
        if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
          navigateUp();
        } else { 
          navigateDown();
        }
      }
    });
    
    $(document).on("click", ".scroll-btn", function() {
      if (scrolling) return;
      if ($(this).hasClass("up")) {
        navigateUp();
      } else {
        navigateDown();
      }
    });
    
    $(document).on("keydown", function(e) {
      if (scrolling) return;
      if (e.which === 38) {
        navigateUp();
      } else if (e.which === 40) {
        navigateDown();
      }
    });
    
    $(document).on("click", ".nav-btn:not(.active)", function() {
      if (scrolling) return;
      pagination(+$(this).attr("data-target"));
    });
  
  });