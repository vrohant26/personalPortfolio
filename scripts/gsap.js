const splitHead = new SplitType(".hero-name h1", { types: "chars" });

export function mobileMenu() {
  const open = document.querySelector("#open");
  const close = document.querySelector("#close");
  const overlayMenu = document.querySelector(".mobile-menu-full");
  const links = overlayMenu.querySelectorAll("a");

  const tl = gsap.timeline({ paused: true }); // Create a paused timeline

  // Define the opening animation

  tl.to("nav .logo", {
    scale: 100,
    duration: 1,
    ease: "expo.inOut",
  });

  tl.to(overlayMenu, {
    display: "block",
  });

  open.addEventListener("click", () => {
    gsap.to(".menu p", {
      yPercent: -100,
      duration: 0.2,
    });
    tl.play(); // Play the opening animation
  });

  close.addEventListener("click", () => {
    gsap.to(".menu p", {
      yPercent: 0,
      duration: 0.2,
    });
    tl.reverse(); // Reverse the animation to close
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      tl.reverse(); // Close the menu when a link is clicked
    });
  });
}

export function accordion() {
  let groups = gsap.utils.toArray(".accordion-group");
  let menus = gsap.utils.toArray(".accordion-menu");
  let menuToggles = groups.map(createAnimation);

  menus.forEach((menu) => {
    menu.addEventListener("click", () => {
      toggleMenu(menu);
    });
  });

  function toggleMenu(clickedMenu) {
    menuToggles.forEach((toggleFn) => toggleFn(clickedMenu));
  }

  function createAnimation(element) {
    let menu = element.querySelector(".accordion-menu");
    let box = element.querySelector(".accordion-content");

    gsap.set(box, { height: "auto !important" });

    let animation = gsap
      .from(box, {
        height: 0,
        duration: 0.5,
        ease: "power1.inOut",
      })
      .reverse();

    return function (clickedMenu) {
      if (clickedMenu === menu) {
        animation.reversed(!animation.reversed());
      } else {
        animation.reverse();
      }
    };
  }
}

export function preloader() {
  const preloader = document.querySelector(".preloader h2");

  // const tl = gsap.timeline({ paused: true });
  const tl = gsap.timeline();

  tl.from(".preloader .counter", {
    textContent: 0,
    duration: 1,
    ease: Power1.easeIn,
    snap: { textContent: 1 },
    stagger: 1,
  });

  tl.to(
    preloader,
    {
      opacity: 0,
      delay: 1,
      duration: 0.5,
      onComplete: () => {
        document.querySelector("nav").style.zIndex = "999";
        document.querySelector(".preloader").style.display = "none";
      },
    },
    "-=1"
  );

  tl.from(
    ".logo",
    {
      scale: 300,
      ease: "expo.inOut",
      duration: 2,
    },
    "-=1"
  );

  tl.from(
    splitHead.chars,
    {
      yPercent: 100,
      stagger: -0.009,
      duration: 1,
      ease: "expo.inOut",
    },
    "-=1.2"
  );

  tl.from(
    "nav .menu-item ul li",
    {
      opacity: 0,
      xPercent: 50,
      duration: 1,
      stagger: -0.05,
    },
    "-=1"
  );

  tl.from(
    ".hero-content,  .social-links",
    {
      opacity: 0,
      yPercent: 50,
      duration: 1,
      stagger: 0.5,
    },
    "-=1"
  );
}

export function textUp() {
  const para = new SplitType(".about h4 ", { types: "lines, words" });
  gsap.from(para.words, {
    yPercent: 100,
    duration: 1,
    stagger: 0.005,
    ease: "expo.inOut",
    scrollTrigger: {
      trigger: ".about",
      start: "top 90%",
      toggleActions: "play none none reset",
    },
  });
}

export function headingAnimation() {
  const splitText = new SplitType(".animate-text", { types: "chars" });

  gsap.utils.toArray(".animate-text").forEach((text) => {
    gsap.from(text.querySelectorAll(".char"), {
      yPercent: 120,
      stagger: 0.012,
      duration: 1.5,
      ease: "expo.inOut",
      scrollTrigger: {
        trigger: text,
        start: "top 95%",
      },
    });
  });
}

export function fadeUp() {
  gsap.utils.toArray(".fade-up").forEach((container) => {
    gsap.from(container, {
      opacity: 0,
      yPercent: 10,
      duration: 1,
      scrollTrigger: {
        trigger: container,
        start: "top 30%",
      },
    });
  });
}

export function lineAnimation() {
  gsap.utils.toArray(".lines").forEach((line) => {
    gsap.from(line, {
      opacity: 0,
      width: "0%",
      duration: 1,
      delay: 0.2,
      scrollTrigger: {
        trigger: line,
        start: "top 100%",
      },
    });
  });
}

export function snapProjects() {
  // Create ScrollTrigger for each new project-card
  document.querySelectorAll(".project-card").forEach((card, index) => {
    ScrollTrigger.create({
      trigger: card,
      start: "top top", // Start snapping when the card reaches the top
      end: "bottom 60%", // End snapping when the card leaves the viewport
      scrub: true, // Smooth animation
      pin: true, // Pin the card in place during snapping
      pinSpacing: true, // Ensure pinned elements don't shift layout

      snap: {
        snapTo: "start", // Snap to the start of each card
      },
    });
  });
}

export function selecedProjectAnimation() {
  const projectDisplay = document.querySelectorAll(".project-display");
  const projectName = document.querySelectorAll(".project-name h2");
  const projectDescription = document.querySelectorAll(
    ".project-card .description, .project-card .count"
  );

  projectDescription.forEach((desc) => {
    gsap.from(desc, {
      opacity: 0,
      duration: 2,
      delay: 0.5,
      scrollTrigger: {
        trigger: desc,
        start: "top 100%",
      },
    });
  });
  projectDisplay.forEach((video) => {
    gsap.from(video, {
      scaleY: 0,
      transformOrigin: "bottom",
      duration: 1,
      ease: "expo.inOut",
      scrollTrigger: {
        trigger: video,
        start: "top 100%",
      },
    });
  });
  projectName.forEach((name) => {
    const splitProjectName = new SplitType(name, { types: "chars" });

    gsap.from(splitProjectName.chars, {
      yPercent: 120,
      duration: 1,
      ease: "expo.inOut",
      stagger: 0.012,
      scrollTrigger: {
        trigger: name,
        start: "top 100%",
      },
    });
  });
}

export function openAnimation() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".footer-animation",
      start: "top top",

      pin: true,
      scrub: true,
    },
  });

  tl.to(
    ".upper",
    {
      yPercent: -120,
    },
    "a"
  );
  tl.to(
    ".lower",
    {
      yPercent: 120,
    },
    "a"
  );

  tl.from(
    "footer .cta-container",
    {
      scale: 1.5,
    },
    "a"
  );
}
