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

        document.getElementById("video1").src = project.video1;
        document.getElementById("video2").src = project.video2;
      }
    });
}
