const container_navigation = document.getElementById("container-navigation");
const displayContainer = document.getElementById("display");
const navigation_button_image = document.getElementById("navigation-button-image");
const navigationElement = document.getElementById("navigation");


function setupHook() {
  fetch('./data.json')
    .then(response => {
      return response.json();
    })
    .then(data => {
      for (const region in data) {
        const navigation_template = `<button class="navigation-item" onclick="navigateTo(this.textContent);">${region}</button>`;
        navigationElement.insertAdjacentHTML("beforeend", navigation_template);
        const section_template = `<section region="${region}">
          <header class="header">
            <span class="name">${region}</span>
          </header>
          <main class="content"></main>
        </section>`;
        displayContainer.insertAdjacentHTML("beforeend", section_template);
        section_content = document.querySelector(`[region="${region}"]`).querySelector(".content");
        for (const i in data[region]) {
          festival = data[region][i];
          let paragraphs = [];
          for (const i in festival["paragraphs"]) {
            paragraphs.push(`<p>${festival["paragraphs"][i]}</p>`)
          }
          const template = `<div class="card">
            <header>
              <span class="name">${festival["name"]}</span>
              <button class="collapse-button" onclick="display(this);">
                <img class="image" src="./assets/collapse.png">
              </button>
            </header>
            <main class="description">
              <div class="info">
                <div class="location">
                  Location: <span class="data">${festival["location"]}</span>
                </div>
                <div class="date">
                  Date: <span>${festival["date"]}</span>
                </div>
              </div>
              <img class="banner" src="${festival["image_path"]}">
              <div class="background">
                ${paragraphs.join("\n")}
              </div>
            </main>
          </div>`;
          section_content.insertAdjacentHTML("beforeend", template);
        }
      }
    })
}

setupHook();


function navigation() {
  if (navigation_button_image.classList.contains("opened")) {
    navigation_button_image.classList.remove("opened");
    container_navigation.style.top = "90vh";
    container_navigation.style.overflowY = "clip";
  } else {
    navigation_button_image.classList.add("opened");
    container_navigation.style.top = 0;
    container_navigation.style.overflowY = "auto";
  }
}


function navigateTo(name) {
  navigation();
  const regions = document.querySelectorAll("[region]");
  for (const region of regions) {
    if (region.getAttribute("region") == name) {
      region.classList.add("display");
    } else {
      region.classList.remove("display");
    }
  }
}


function display(button) {
  if (button.children[0].classList.contains("opened")) {
    button.children[0].classList.remove("opened");
    button.parentNode.parentNode.children[1].style.display = "none";
  } else {
    button.children[0].classList.add("opened");
    button.parentNode.parentNode.children[1].style.display = "block";
  }
}


container_navigation.style.top = "90vh";
container_navigation.style.overflowY = "clip";