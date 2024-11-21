import { leaveAnimation, enterAnimation } from "./barba.js";
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

export const intiBarba = () => {
  // function delay(n) {
  //   n = n || 2000;
  //   return new Promise((done) => {
  //     setTimeout(() => {
  //       done();
  //     }, n);
  //   });
  // }

  barba.init({
    async: true,
    transitions: [
      {
        name: "opacity-transition",
        async leave(data) {
          // const done = this.async();
          return leaveAnimation(data);
          // await delay(50);
          // done();
        },

        async afterLeave() {
          ScrollTrigger.getAll().forEach((t) => t.kill());
          ScrollTrigger.refresh(true);
        },

        async enter(data) {
          const video = data.next.container.querySelectorAll("video");
          ScrollTrigger.refresh(true);
          video.forEach((vid) => {
            if (vid) {
              vid.play();
            }
          });

          window.scroll(0, 0);
          enterAnimation(data);
        },

        async once() {
          preloader();
        },
      },
      {
        name: "single-project-transition",
        async leave(data) {
          return;
        },
        async enter(data) {
          return;
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
            navbar();
            mobileMenu();
          }, 50);
        },
      },
      {
        namespace: "single-project",
        beforeEnter() {
          setTimeout(() => {
            openAnimation();
            textUp();
            navbar();
            mobileMenu();
          }, 50);
        },
      },
    ],
  });
};

// snapProjects();

smoothScroll();
intiBarba();
