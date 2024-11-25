export const leaveAnimation = (data) => {
  const logo = data.current.container.querySelector(".logo");

  return gsap.to(logo, {
    scale: 200,

    ease: "expo.inOut",
    duration: 1,
  });
};
export const enterAnimation = (data) => {
  const logo = data.next.container.querySelector(".logo");

  return gsap.from(logo, {
    scale: 200,
    ease: "expo.inOut",
    duration: 1,
    onComplete: () => {
      ScrollTrigger.refresh(true);
    },
  });
};
