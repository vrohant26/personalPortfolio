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
      }
    });
}
