import { intiBarba } from "./barba.js";

function smoothScroll() {
  const lenis = new Lenis();

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}

export function getCurrentYear() {
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

smoothScroll();
intiBarba();
window.goBack = goBack;
