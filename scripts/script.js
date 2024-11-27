import {
  leaveAnimation,
  enterAnimation,
  defaultLeave,
  defaultEnter,
} from "./barba.js";
import {
  mobileMenu,
  accordion,
  preloader,
  textUp,
  headingAnimation,
  lineAnimation,
  fadeUp,
  openAnimation,
} from "./gsap.js";

import { addProject } from "../components/components.js";
import { singlePageData } from "../components/singleProject.js";

function smoothScroll() {
  const lenis = new Lenis();

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}

function getCurrentYear() {
  const currentYear = new Date().getFullYear();
  document.querySelectorAll(".currentYear").forEach((element) => {
    element.innerHTML = `${currentYear}`;
  });
}

function navbar() {
  let lastScroll = 0;
  const navbar = document.querySelector("#nav");

  ScrollTrigger.create({
    onUpdate: (self) => {
      let currentScroll = self.scroll();

      if (currentScroll > lastScroll && currentScroll > 200) {
        gsap.to(navbar, {
          top: "-100%",
          duration: 1,
          ease: "power2.out",
        });
      } else if (currentScroll < lastScroll) {
        gsap.to(navbar, {
          top: "0",
          duration: 1,
          ease: "power2.out",
        });
      }

      lastScroll = currentScroll;
    },
  });
}

function goBack() {
  if (window.history.length > 1) {
    window.history.back(); // Goes back to the previous page in the browsing history.
  } else {
    window.location.href = "/"; // Redirects to a default page if there's no history.
  }
}

export const intiBarba = () => {
  barba.init({
    sync: true,
    transitions: [
      {
        name: "opacity-transition",
        from: { namespace: "home" },
        to: { namespace: "single-project" },
        leave() {
          return leaveAnimation();
        },

        enter() {
          window.scroll(0, 0);
          enterAnimation();
        },

        once() {
          // preloader();
        },
      },
      {
        name: "default-transition",
        leave(data) {
          return defaultLeave(data);
        },
        enter(data) {
          const video = data.next.container.querySelectorAll("video");

          video.forEach((vid) => {
            if (vid) {
              vid.play();
            }
          });
          defaultEnter(data);
        },
      },
    ],
    views: [
      {
        namespace: "home",
        beforeEnter() {
          addProject();
          ScrollTrigger.refresh(true);
        },
        afterEnter() {
          setTimeout(() => {
            fadeUp();
            headingAnimation();
            lineAnimation();
            textUp();
            accordion();
            getCurrentYear();
            openAnimation();
            // navbar();
            mobileMenu();
          }, 50);
        },
      },
      {
        namespace: "single-project",
        beforeEnter() {
          setTimeout(() => {
            openAnimation();

            // navbar();
            mobileMenu();

            singlePageData();
          }, 50);
        },
      },
    ],
  });
};

smoothScroll();
intiBarba();
window.goBack = goBack;
