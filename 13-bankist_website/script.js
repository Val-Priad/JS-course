"use strict";
///////////////////////////////////////
// Modal window
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");
const openModal = function (e) {
    e.preventDefault();
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};
const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};
btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
    }
});
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
// TABBED COMPONENT
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
/* BAD PRACTICE
// we need to use event delegation here, because it's a bad practice
// to create a lot of event listeners when only one can handle all cases

tabs.forEach((tab) =>
  tab.addEventListener("click", (e: any) => {
    console.log(e.target.getAttribute("data-tab"));
  })
);
*/
tabsContainer.addEventListener("click", (e) => {
    e.preventDefault();
    const clicked = e.target.closest(".operations__tab");
    // GUARD CLAUSE
    if (!clicked)
        return;
    tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
    clicked.classList.add("operations__tab--active");
    tabsContent.forEach((content) => {
        content.classList.remove("operations__content--active");
    });
    const contentEl = document.querySelector(`.operations__content--${clicked.dataset.tab}`);
    contentEl.classList.add("operations__content--active");
});
// NAVIGATION FADE OUT
const setFadeOutOpacity = (e, value) => {
    if (e.target.classList.contains("nav__link")) {
        const link = e.target;
        const siblings = link
            .closest(".nav__links")
            .querySelectorAll(".nav__link");
        const logo = link.closest(".nav").querySelector("img");
        siblings.forEach((sibling) => {
            if (link !== sibling) {
                sibling.style.opacity = value;
            }
        });
        logo.style.opacity = value;
    }
};
nav.addEventListener("mouseover", (e) => {
    setFadeOutOpacity(e, "0.5");
});
nav.addEventListener("mouseout", (e) => {
    setFadeOutOpacity(e, "1");
});
// STICKY NAVIGATION BAR
/* BAD PRACTICE
window.addEventListener("scroll", (e) => {
  const section1Coordinates = section1.getBoundingClientRect();
  if (window.scrollY > section1Coordinates.top) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
});
*/
const obsCallback = (entries, observer) => {
    entries.forEach((entry) => {
        // console.log(entry);
        if (!entry.isIntersecting)
            nav.classList.add("sticky");
        else
            nav.classList.remove("sticky");
    });
};
const obsOptions = {
    root: null,
    threshold: 0.1,
};
const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(header);
// SECTIONS ANIMATION
const sectionObsCallback = (entries, observer) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting)
            return;
        // console.log(entry);
        entry.target.classList.remove("section--hidden");
        observer.unobserve(entry.target);
    });
};
const sectionObsOptions = {
    root: null,
    threshold: 0.1,
};
const sections = document.querySelectorAll(".section");
const sectionObserver = new IntersectionObserver(sectionObsCallback, sectionObsOptions);
sections.forEach((sec) => {
    sec.classList.add("section--hidden");
    sectionObserver.observe(sec);
});
// IMAGES ANIMATION
const imgs = document.querySelectorAll(".features__img");
const imgObsOptions = {
    root: null,
    threshold: 0.5,
};
const imgObsCallback = (entries, observer) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting)
            return;
        console.log(entry);
        entry.target.src = entry.target.dataset.src;
        // It's necessary to do like this, because without it we will show bad img
        entry.target.addEventListener("load", () => {
            entry.target.classList.remove("lazy-img");
        });
        observer.unobserve(entry.target);
    });
};
const imgObserver = new IntersectionObserver(imgObsCallback, imgObsOptions);
imgs.forEach((img) => {
    imgObserver.observe(img);
});
// SLIDER
/* // Creating dots programmatically
const createDots = () => {
slides.forEach((slide) => {
  dotContainer.insertAdjacentHTML(
    "beforeend",
    `<div class="dots__dot"></div>`
  );
});
};
createDots();
*/
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
let curSlide = 0;
const dotContainer = document.querySelector(".dots");
const dots = [...document.querySelectorAll(".dots__dot")];
const setBasicSliderState = () => {
    curSlide = 0;
    goToSlide(0);
};
const setDot = (curSlide) => {
    dots.forEach((dot) => {
        dot.classList.remove("dots__dot--active");
    });
    dots[curSlide].classList.add("dots__dot--active");
};
const goToSlide = (curSlide) => {
    if (curSlide < 0 || curSlide > 2) {
        setBasicSliderState();
        return;
    }
    setDot(curSlide);
    slides.forEach((slide, idx) => {
        slide.style.transform = `translateX(${100 * (idx - curSlide)}%)`;
    });
};
goToSlide(curSlide);
btnRight.addEventListener("click", () => {
    goToSlide(++curSlide);
});
btnLeft.addEventListener("click", () => {
    goToSlide(--curSlide);
});
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
        goToSlide(++curSlide);
    }
    else if (e.key === "ArrowLeft") {
        goToSlide(--curSlide);
    }
});
document.addEventListener("DOMContentLoaded", (e) => {
    console.log(e);
});
