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
          .querySelectorAll(
            "#singleProject, .archive .upper, .archive .lower, nav"
          )
          .forEach((element) => {
            element.style.backgroundColor = project.backgroundColor;
          });

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
      }
    });
}
