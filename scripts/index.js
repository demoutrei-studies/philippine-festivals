const cards = document.querySelectorAll(".card");
const clearSearchBarButton = document.querySelector("#clear-search-bar-button");
const containerSearch = document.querySelector("#container-search");
const contentElement = document.querySelector("#content");
const searchBar = document.querySelector("#search-bar");
const searchResultsList = document.querySelector("#search-results");


function clearSearchBar() {
  searchBar.value = "";
  searchResults("");
  clearSearchBarButton.classList.remove("show");
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
          const festivalCard = `<div class="card">
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
    containerSearch.classList.remove("show");
  } else {
    containerSearch.classList.add("show");
    searchResults("");
  }
}


async function searchResults(searchValue) {
  if (0 < searchValue.length) {
    clearSearchBarButton.classList.add("show");
  }
  searchResultsList.innerHTML = "";
  fetchData().then(data => {
    for (const group in data) {
      for (const region in data[group]) {
        for (let i in data[group][region]) {
          festival = data[group][region][i];
          if (festival["name"].toLowerCase().includes(searchValue.toLowerCase()) || (searchValue.length == 0)) {
            const searchResultItem = `<li><button region="${region}" festivalName=\`${festival["name"]}\`><b>${festival["name"]}</b> (${region})</button></li>`;
            searchResultsList.insertAdjacentHTML("beforeend", searchResultItem);
          }
        }
      }
    }
  })
}