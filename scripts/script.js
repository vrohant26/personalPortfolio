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



function goBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = "/";
  }
}

function openVideo() {

  const videoElement = document.getElementById("myVideo");

  if(videoElement){
     // Add an event listener for the click event
  videoElement.addEventListener("click", () => {
    // Check if the Fullscreen API is available
    if (videoElement.requestFullscreen) {
      videoElement.requestFullscreen();
    } else if (videoElement.webkitRequestFullscreen) {
      // For Safari
      videoElement.webkitRequestFullscreen();
    } else if (videoElement.msRequestFullscreen) {
      // For IE/Edge
      videoElement.msRequestFullscreen();
    }

    // Play the video in fullscreen mode
    videoElement.play();
  });
  }
 
}

function lazyLoadVideo() {
  const videos = document.querySelectorAll("video[data-src]");

  const videoObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const video = entry.target;

        // Set the actual video src from data-src
        video.src = video.getAttribute("data-src");
        video.removeAttribute("data-src");

        // Load the video
        video.load();

        // Stop observing this video as it has been loaded
        observer.unobserve(video);
      }
    });
  });

  videos.forEach((video) => videoObserver.observe(video));
}

lazyLoadVideo();
openVideo();
smoothScroll();
intiBarba();
window.goBack = goBack;
