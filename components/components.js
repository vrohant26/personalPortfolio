import { selecedProjectAnimation, snapProjects } from "../scripts/gsap.js";

export let selectedWorksData = [];

export async function addProject() {
  const selectedProject = document.getElementById("selectedProject");

  try {
    const response = await fetch("../data.json");
    const json = await response.json();
    selectedWorksData = json.selectedWorks;

    selectedWorksData.forEach((data) => {
      const projectHTML = `
        <a href="../singleProject.html?id=${data.id}">
          <div style="background-color: ${data.backgroundColor}" 
               class="project-card pl-5 pr-5 pb-5 pt-5 project-${data.id} d-flex h-full">
            <div class="top d-flex space-between">
              <div class="count"><h2>${data.count}</h2></div>
            </div>
            <div class="bottom d-flex space-between">
              <div class="project-details">
                <div class="project-service"><h6>${data.projectService}</h6></div>
                <div class="project-name"><h2>${data.projectName}</h2></div>
              </div> 
              <div class="project-display d-flex center">
                <video preload = "none"  autoplay="false" muted loop playsinline ><source src="${data.projectVideoLink}" type="video/mp4" ></video>
              </div>
            </div>
          </div>
        </a>`;
      selectedProject.innerHTML += projectHTML;
    });

    // Trigger animations and refresh ScrollTrigger
    snapProjects();
    selecedProjectAnimation();
   
    ScrollTrigger.refresh(true);
  } catch (error) {
    console.error("Error:", error);
  }
}
