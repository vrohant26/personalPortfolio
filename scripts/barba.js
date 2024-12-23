import {
  mobileMenu,
  accordion,
  textUp,
  headingAnimation,
  lineAnimation,
  fadeUp,
  openAnimation,
  preloader,
} from "./gsap.js";

import { addProject, selectedWorksData } from "../components/components.js";
import { singlePageData } from "../components/singleProject.js";
import { getCurrentYear } from "./script.js";

export const intiBarba = () => {
  barba.init({
    sync: true,
    transitions: [
      {
        name: "singlePage-transition",
        from: { namespace: "home" },
        to: { namespace: "single-project" },
        async leave(data) {
          return defaultLeave(data);
        },

        async enter(data) {
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
          const video = data.next.container.querySelectorAll("video");

          video.forEach((vid) => {
            if (vid) {
              vid.play();
            }
          });

          gsap.from(data.next.container, {
            opacity: 0,
            ease: "expo.inOut",
            duration: 1,
          });
        },

        async once() {
          preloader();
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
            mobileMenu();
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

  const currentProject = selectedWorksData.find(
    (project) => project.id == nextProjectId
  );

  const specificCard = data.current.container.querySelector(
    `.project-card.project-${nextProjectId}`
  );

  const transitionContainer = data.current.container.querySelector(
    ".transition-container"
  );

  gsap.set([transitionContainer, data.next.container], {
    backgroundColor: currentProject.backgroundColor,
  });

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
  const projectName = data.next.container.querySelector(
    "#singleProject .hero-name .left h2"
  );

  // gsap.set(projectName, { y: "-120%",  });

  const tl = gsap.timeline();

  tl.to("#singleProject .hero", {
    visibility: "visible",
  });

  tl.from(
    [projectName],
    {
      y: "-120%",
      transform: "rotate(-5deg)",

      stagger: 0.05,
      duration: 1.2,
      ease: "expo.inOut",
    },
    "-=1"
  );

  tl.fromTo(
    ".lines",
    { width: "0%", opacity: 0 },
    { width: "100%", opacity: 1, ease: "expo.out", duration: 1, delay: 0.2 },
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
};
