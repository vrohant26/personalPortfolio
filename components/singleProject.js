export function singlePageData() {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = parseInt(urlParams.get("id"));

  fetch("../data.json")
    .then((response) => response.json())
    .then((json) => {
      const projects = json.selectedWorks;
      const totalProjects = projects.length;

      const project = projects.find((p) => p.id === projectId);

      if (document.querySelector("#singleProject").style.backgroundColor == "") {
        document.querySelector("#singleProject").style.backgroundColor = project.backgroundColor;
      }

      if (project) {
        document.querySelector("title").textContent =
          project.projectName + " - Rohant Villarosa";

        document.getElementById("projectName").textContent =
          project.projectName;
        document.getElementById("preview").src = project.projectVideoLink;

        document.querySelector(".project-desc h6").textContent =
          project.description;

        document.querySelectorAll("#link").forEach((link) => {
          link.href = `https://${project.url}`;
        });

        document.querySelector("#video1").src = project.video1;
        if (project.video2) {
          document.querySelector("#video2").src = project.video2;
        } else {
          document.querySelector("#video2").style.display = "none";
        }

        const mobiles = ["mobile1", "mobile2", "mobile3"];
        mobiles.forEach((id, index) => {
          const element = document.querySelector(`#${id}`);
          if (element) {
            element.src = project[`mobile${index + 1}`];
          }
        });

        for (const key in project) {
          const element = document.querySelector(`#${key}`);
          if (element) {
            element.textContent = project[key];
          }
        }

        // Handle Next Project
        const nextProjectId = (projectId % totalProjects) + 1; // Loop back to 1 if it's the last project
        const nextProject = projects.find((p) => p.id === nextProjectId); // Get next project details

        if (nextProject) {
          const nextProjectLink = `/project.html?id=${nextProjectId}`;
          document.querySelector("#nextProjectLink").href = nextProjectLink;

          document.querySelector(".next-project h2").textContent =
            nextProject.projectName;
          document.querySelector("#nextPreview").src = nextProject.preview;
        }
      }
    });
}
