import {
  mobileMenu,
  accordion,
  textUp,
  headingAnimation,
  lineAnimation,
  fadeUp,
  openAnimation,
  cursor,
} from "./gsap.js";

import { addProject } from "../components/components.js";
import { singlePageData } from "../components/singleProject.js";
import { getCurrentYear, navbar } from "./script.js";

export const intiBarba = () => {
  barba.init({
    sync: true,
    transitions: [
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
        },
        afterEnter() {
          setTimeout(() => {
            // cursor();
            navbar();
            fadeUp();
            headingAnimation();
            lineAnimation();
            textUp();
            accordion();
            getCurrentYear();
            openAnimation();

            mobileMenu();
          }, 150);
        },
      },
      {
        namespace: "single-project",
        beforeEnter() {
          setTimeout(() => {
            navbar();
            openAnimation();
            mobileMenu();
            singlePageData();
          }, 50);
        },
      },
    ],
  });
};

export const defaultLeave = (data) => {
  // const logo = data.current.container.querySelector(".logo");
  return gsap.to(data.current.container, {
    opacity: 0,
    ease: "expo.inOut",
    duration: 1,
  });
};

export const defaultEnter = (data) => {
  // const logo = data.next.container.querySelector(".logo");
  return gsap.from(data.next.container, {
    opacity: 0,
    ease: "expo.inOut",
    duration: 1,
  });
};

barba.hooks.enter(() => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  ScrollTrigger.refresh(true);
  window.scroll(0, 0);
});
