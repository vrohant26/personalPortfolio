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
    menu.addEventListener("click", () => toggleMenu(menu));
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
  const preloader = document.querySelector(".preloader");
  const name = new SplitType(".hero-name h1", { types: "chars" });

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
      duration: 1,
      onComplete: () => {
        document.querySelector("nav").style.zIndex = "999";
        preloader.style.display = "none";
      },
    },
    "-=1"
  );

  tl.from(".logo", {
    scale: 300,
    duration: 1,
  });

  tl.from(
    name.chars,
    {
      yPercent: 100,
      stagger: -0.012,
    },
    "-=0.5"
  );

  tl.from(
    "nav .menu-item ul li",
    {
      opacity: 0,
      xPercent: 50,
      duration: 0.5,
      stagger: -0.05,
    },
    "-=0.5"
  );

  tl.from(
    ".hero-content,  .social-links",
    {
      opacity: 0,
      yPercent: 50,
      duration: 0.5,
      stagger: 0.5,
    },
    "-=0.5"
  );
}
