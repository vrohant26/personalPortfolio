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
