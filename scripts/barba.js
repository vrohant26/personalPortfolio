import {
  mobileMenu,
  accordion,
  textUp,
  headingAnimation,
  lineAnimation,
  fadeUp,
  openAnimation,
} from "./gsap.js";

import { addProject } from "../components/components.js";
import { singlePageData } from "../components/singleProject.js";
import { getCurrentYear } from "./script.js";
import { selectedWorksData } from "../components/components.js";

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
        name: "singlePage-transition",
        from: { namespace: "home" },
        to: { namespace: "single-project" },
        async leave(data) {
          // const done = this.async();
          return defaultLeave(data);
          // await delay(800);
          // done();
        },

        afterLeave() {
          ScrollTrigger.getAll().forEach((t) => t.kill());
          ScrollTrigger.refresh(true);
        },

        async enter(data) {
          const video = data.next.container.querySelectorAll("video");

          video.forEach((vid) => {
            if (vid) {
              vid.play();
            }
          });
          defaultEnter(data);
        },
      },

      {
        name: "default-transition",
        async leave(data) {
          return gsap.to(data.current.container, {
            opacity: 0,
            ease: "expo.inOut",
            duration: 1,
          });
        },
        async enter(data) {
          gsap.from(data.next.container, {
            opacity: 0,
            ease: "expo.inOut",
            duration: 1,
          });
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
            fadeUp();
            headingAnimation();
            lineAnimation();
            textUp();
            accordion();
            getCurrentYear();
            openAnimation();

            mobileMenu();
          }, 50);
        },
      },
      {
        namespace: "single-project",
        beforeEnter() {
          window.scroll(0, 0);
          singlePageData();

          setTimeout(() => {
            mobileMenu();
          }, 50);
        },
      },
      {
        namespace: "Test-Page",
        beforeEnter() {
          window.scroll(0, 0);

          setTimeout(() => {
            openAnimation();
          }, 50);
        },
      },
    ],
  });
};

export const defaultLeave = (data) => {
  const tl = gsap.timeline();

  const nextLink = data.trigger;
  const urlParams = new URLSearchParams(new URL(nextLink.href).search);
  const nextProjectId = parseInt(urlParams.get("id"));

  const specificCard = data.current.container.querySelector(
    `.project-card.project-${nextProjectId}`
  );

  const transitionContainer = data.current.container.querySelector(
    ".transition-container"
  );

  if (specificCard) {
    tl.to(specificCard, {
      scale: 0.8,
      duration: 1.2,
      ease: "expo.inOut",
    });

    tl.to(
      transitionContainer,
      {
        y: "0%",
        duration: 1.2,
        ease: "expo.inOut",
      },
      "-=1.1"
    );
  }

  return tl;
};

export const defaultEnter = (data) => {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = parseInt(urlParams.get("id"));

  const color = selectedWorksData.find((project) => {
    if (project.id == projectId) {
      return project;
    }
  });

  const projectName = data.next.container.querySelector(".hero-name .left h2");
  const tl = gsap.timeline();

  tl.to(".hero", {
    visibility: "visible",
  });

  tl.to([projectName], {
    y: "0%",
    stagger: 0.05,
    duration: 1.2,
    ease: "expo.inOut",
  });

  tl.from(
    ".lines",
    {
      opacity: 0,
      width: "0%",
      duration: 1,
      delay: 0.2,
    },
    "-=0.8"
  );

  tl.from(
    ".project-info, .project-display, .hero-name .left h6, .hero-name img",
    {
      opacity: 0,
      stagger: 0.2,
      duration: 1,
    },
    "-=1.5"
  );
  tl.to("#singleProject", {
    backgroundColor: color.backgroundColor,
    duration: 0.5,
  });
};
