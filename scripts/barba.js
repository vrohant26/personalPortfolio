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
import { getCurrentYear } from "./script.js";

export const intiBarba = () => {
  function delay(n) {
    n = n || 2000;
    return new Promise((done) => {
      setTimeout(() => {
        done();
      }, n);
    });
  }
  barba.init({
    sync: true,
    transitions: [
      {
        name: "opacity-transition",
        from: { namespace: "home" },
        to: { namespace: "single-project" },
        async leave(data) {
          // const done = this.async();
          await leaveAnimation(data.current.container);
          // await delay(1200);
          // done();
        },

        async enter(data) {
          return enterAnimation(data.next.container);
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
          ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
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

const leaveAnimation = (current) => {
  const target = current.querySelectorAll(".count, .project-details");

  const tl = gsap.timeline();

  tl.to(target, {
    opacity: 0,
    ease: "expo.inOut",
    duration: 1,
  });

  return tl;
};
const enterAnimation = (next) => {
  const target = next.querySelectorAll(
    ".hero-name, .hero-content .project-info"
  );

  tl.from(target, {
    opacity: 0,
    ease: "expo.inOut",
    duration: 1,
  });

  return tl;
};

export const defaultLeave = (data) => {
  const logo = data.current.container.querySelector(".logo");
  return gsap.to(logo, {
    scale: 200,
    ease: "expo.inOut",
    duration: 1,
  });
};

export const defaultEnter = (data) => {
  const logo = data.next.container.querySelector(".logo");
  return gsap.from(logo, {
    scale: 200,
    ease: "expo.inOut",
    duration: 2,
  });
};
