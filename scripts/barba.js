export const leaveAnimation = () => {
  const tl = gsap.timeline();

  tl.to(".count, .project-details, .project-display", {
    opacity: 0,
    ease: "expo.inOut",
    duration: 1,
  });

  return tl;
};
export const enterAnimation = () => {
  const tl = gsap.timeline();

  tl.from(".hero-name, .hero-content", {
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
    duration: 1,
  });
};
