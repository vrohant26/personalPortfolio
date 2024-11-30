export function singlePageData() {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get("id");

  fetch("../data.json")
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      const project = json.selectedWorks.find(
        (project) => project.id == projectId
      );

      if (project) {
        ScrollTrigger.refresh(true);
        document.getElementById("projectName").textContent =
          project.projectName;
        document.getElementById("preview").src = project.projectVideoLink;
        document
          .querySelectorAll("#singleProject, .archive .upper, .archive .lower")
          .forEach((element) => {
            element.style.backgroundColor = project.backgroundColor;
          });

        document.querySelector(".project-desc h6").textContent =
          project.description;

        document.querySelectorAll("#link").forEach((link) => {
          link.href = `https://${project.url}`;
        });

        document.querySelector("#video1 video").src = project.video1;
        if (project.video2) {
          document.querySelector("#video2 video").src = project.video2;
        } else {
          document.querySelector("#video2").style.display = "none";
        }
        document.querySelector("#mobile1 img").src = project.mobile1;
        document.querySelector("#mobile2 img").src = project.mobile2;
        document.querySelector("#mobile3 img").src = project.mobile3;

        for (const key in project) {
          const element = document.querySelector(`#${key}`);
          if (element) {
            element.textContent = project[key];
          }
        }
      }
    });
}
