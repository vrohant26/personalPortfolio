export function addProject() {
  const selectedProject = document.getElementById("selectedProject");

  fetch("../data.json")
    .then((response) => response.json())
    .then((json) => {
      const selectedWorksData = json.selectedWorks;

      selectedWorksData.forEach((data) => {
        const projectHTML = `<div style="background-color : ${data.backgroundColor}" class=" project-card pl-5 pr-5 pb-5 pt-5 project-${data.id} d-flex  h-full">
          <div class="top d-flex space-between">
            <div class="count"><h2>${data.count}</h2></div>
            <div class="description"><h6>${data.description}</h6></div>
          </div>
          <div class="bottom d-flex space-between">
            <div class="project-details">
              <div class="project-service "><h6>${data.projectService}</h6></div>
              <div class="project-name"><h2>${data.projectName}</h2></div>
            </div>
            <div class="project-display">
              <!-- video  -->
            </div>
          </div>
       </div>`;

        selectedProject.innerHTML += projectHTML;
      });
    })
    .catch((error) => console.error("Error:", error));
}
