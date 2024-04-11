const fetchImg = function (URL) {
  fetch(URL, {
    method: "GET",
    body: JSON.stringify(),
    headers: {
      "Content-Type": "application/json",
      Authorization: "l31rfsrTAwca9vZKoNnx65ngytkhZ7qjmikTF56qZGt5AixUaCra5ZsL",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .then((data) => {
      displayImg(data.photos);
    })
    .catch((error) => {
      console.error("Error recover images:", error);
    });
};

const displayImg = function (photos) {
  const container = document.querySelector("#row-container");

  container.innerHTML = "";

  photos.forEach((photo) => {
    const img = photo.src.landscape;
    const title = photo.photographer;
    const description = photo.alt;
    const id = photo.id;
    const div = document.createElement("div");
    div.classList.add("col-md-4");
    div.innerHTML = `
    <div class="card mb-4 shadow-sm">
      <img src="${img}" class="bd-placeholder-img card-img-top" />
      <div class="card-body">
       <h5 class="card-title">${title}</h5>
       <p class="card-text">
       ${description}
       </p>
       </div>
       <div class="d-flex justify-content-between align-items-center mb-4 mx-4">
        <div class="btn-group">
          <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
          <button type="button" class="btn btn-sm btn-outline-secondary btn-hide">Hide</button>
          </div>
          <small class="text-muted">${id}</small>
        </div>
       </div>
    </div>`;
    container.appendChild(div);
  });
};

document.addEventListener("DOMContentLoaded", function () {
  const loadImagesBtn = document.querySelector("#loadImagesBtn");
  const loadSecondaryImagesBtn = document.querySelector("#loadSecondaryImagesBtn");
  const searchInput = document.querySelector("#searchInput");
  const searchBtn = document.querySelector("#searchBtn");

  loadImagesBtn.addEventListener("click", () => {
    fetchImg("https://api.pexels.com/v1/search?query=frog");
  });

  loadSecondaryImagesBtn.addEventListener("click", () => {
    fetchImg("https://api.pexels.com/v1/search?query=football");
  });

  searchBtn.addEventListener("click", () => {
    fetchImg(`https://api.pexels.com/v1/search?query=${searchInput.value}`);
  });

  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("btn-hide")) {
      const column = event.target.closest(".col-md-4");
      if (column) {
        column.remove();
      }
    }
  });
});
