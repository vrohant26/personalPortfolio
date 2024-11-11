
import { intiBarba } from "./barba.js";
import { mobileMenu } from "./gsap.js";

function smoothScroll(){
    const lenis = new Lenis();
  
    function raf(time) {
      
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
  
    requestAnimationFrame(raf);
  };

 function getCurrentYear(){
    const currentYear = new Date().getFullYear();
    document.querySelector(".currentYear").innerHTML = `${currentYear}`
} 


function getHeader(){
  fetch("./components/header.html")
  .then((response)=> response.text())
    .then((data)=>{ 
      document.getElementById("navbar").innerHTML = data
    })
}





 
getHeader(); 
mobileMenu();

getCurrentYear();
smoothScroll();
intiBarba();
