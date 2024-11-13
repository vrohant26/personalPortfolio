import { intiBarba } from "./barba.js";
import { mobileMenu, accordion, preloader } from "./gsap.js";
import { addProject } from "../components/selectedProjects.js";

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

      if (currentScroll > lastScroll && currentScroll > 100) {
        gsap.to(navbar, {
          top: "-100%",
          duration: 1,
          ease: "power2.out",
        });
      } else if (currentScroll < lastScroll) {
        gsap.to(navbar, { top: "0", duration: 1, ease: "power2.out" });
      }

      lastScroll = currentScroll;
    },
  });
}

preloader();
accordion();
navbar();
mobileMenu();
getCurrentYear();
smoothScroll();
intiBarba();
addProject();
