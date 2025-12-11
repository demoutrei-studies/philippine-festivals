const cards = document.querySelectorAll(".card");
const clearSearchBarButton = document.querySelector("#clear-search-bar-button");
const containerClose = document.querySelector("#container-close");
const containerFestivalDisplay = document.querySelector("#container-festival-display");
const containerSearch = document.querySelector("#container-search");
const contentElement = document.querySelector("#content");
const searchBar = document.querySelector("#search-bar");
const searchResultsList = document.querySelector("#search-results");


function clearSearchBar() {
  searchBar.value = "";
  searchResults("");
  clearSearchBarButton.classList.remove("show");
}


function closeDisplay() {
  containerClose.classList.remove("active");
  containerFestivalDisplay.classList.remove("show");
  containerSearch.classList.remove("show");
}


function displayFestival(festivalName) {
  containerSearch.classList.remove("show");
  fetchData().then(data => {
    for (const group in data) {
      for (const region in data[group]) {
        for (let i in data[group][region]) {
          festival = data[group][region][i];
          if (festival["name"] == festivalName) {
            containerFestivalDisplay.querySelector("#banner").style.backgroundImage = `url("${festival["image_path"]}")`;
            containerFestivalDisplay.querySelector(".title").textContent = festivalName;
            containerFestivalDisplay.querySelector(".location").textContent = festival["location"];
            containerFestivalDisplay.querySelector(".date").textContent = festival["date"];
            const paragraphs = [];
            for (const i in festival["paragraphs"]) {
              paragraphs.push(`<p>${festival["paragraphs"][i]}</p>`)
            }
            containerFestivalDisplay.querySelector(".background").innerHTML = "";
            containerFestivalDisplay.querySelector(".background").insertAdjacentHTML("beforeend", paragraphs.join());
          }
        }
      }
    }
  });
  containerClose.classList.add("active");
  containerFestivalDisplay.classList.add("show");
}


async function fetchData() {
  const response = await fetch('./data.json');
  return await response.json();
}


function listFestivals() {
  contentElement.innerHTML = "";
  fetchData().then(data => {
    for (const group in data) {
      for (const region in data[group]) {
        for (let i in data[group][region]) {
          festival = data[group][region][i];
          const festivalCard = `<div class="card" onclick="displayFestival(\`${festival["name"]}\`);">
            <div class="banner" style='background-image: url(\"${festival["image_path"]}\");'></div>
            <div class="overview">
              <span class="title">${festival["name"]}</span>
              <p><b>Location</b>: ${festival["location"]}</p>
              <p><b>Annual Date</b>: ${festival["date"]}</p>
            </div>
          </div>`;
          contentElement.insertAdjacentHTML("beforeend", festivalCard);
        }
      }
    }
  })
}

listFestivals();


function searchDisplay() {
  if (containerSearch.classList.contains("show")) {
    containerClose.classList.remove("active");
    containerSearch.classList.remove("show");
  } else {
    containerClose.classList.add("active");
    containerSearch.classList.add("show");
    searchResults("");
  }
}


async function searchResults(searchValue) {
  searchBar.value = searchValue;
  if (0 < searchBar.value.length) {
    clearSearchBarButton.classList.add("show");
  } else {
    clearSearchBarButton.classList.remove("show");
  }
  searchResultsList.innerHTML = "";
  fetchData().then(data => {
    for (const group in data) {
      for (const region in data[group]) {
        for (let i in data[group][region]) {
          festival = data[group][region][i];
          if (festival["name"].toLowerCase().includes(searchValue.toLowerCase()) || (searchValue.length == 0)) {
            const searchResultItem = `<li><button onclick="displayFestival(\`${festival["name"]}\`);"><b>${festival["name"]}</b> (${region})</button></li>`;
            searchResultsList.insertAdjacentHTML("beforeend", searchResultItem);
          }
        }
      }
    }
  })
}