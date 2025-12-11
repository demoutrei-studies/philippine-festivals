function clearSearchBar() {
  const clearSearchBarButton = document.querySelector("#clear-search-bar-button");
  const searchBar = document.querySelector("#search-bar");
  searchBar.value = "";
  searchResults("");
  clearSearchBarButton.classList.remove("show");
}


function closeDisplay() {
  const containerClose = document.querySelector("#container-close");
  const containerFestivalDisplay = document.querySelector("#container-festival-display");
  const containerSearch = document.querySelector("#container-search");
  containerClose.classList.remove("active");
  containerFestivalDisplay.classList.remove("show");
  containerSearch.classList.remove("show");
}


function displayFestival(festivalName) {
  const containerClose = document.querySelector("#container-close");
  const containerFestivalDisplay = document.querySelector("#container-festival-display");
  const containerSearch = document.querySelector("#container-search");
  containerSearch.classList.remove("show");
  containerClose.classList.add("active");
  fetchData().then(data => {
    for (const group in data) {
      for (const region in data[group]) {
        for (let i in data[group][region]) {
          festival = data[group][region][i];
          if (festival["name"] == festivalName) {
            containerFestivalDisplay.querySelector("#banner").style.backgroundImage = `url("${festival["image_path"]}")`;
            containerFestivalDisplay.querySelector(".title").textContent = festivalName;
            containerFestivalDisplay.querySelector(".region").textContent = `${region}, ${group}`;
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


function listFestival(group, region, festival) {
  const contentElement = document.querySelector("#content");
  const festivalCard = `<div class="card" onclick="displayFestival(\`${festival["name"]}\`);">
    <div class="banner" style='background-image: url(\"${festival["image_path"]}\");'></div>
    <div class="overview">
      <ul class="badges-list">
        <li>${group}</li>
        <li>${region}</li>
      </ul>
      <span class="title">${festival["name"]}</span>
      <p><b>Location</b>: ${festival["location"]}</p>
      <p><b>Annual Date</b>: ${festival["date"]}</p>
    </div>
  </div>`;
  contentElement.insertAdjacentHTML("beforeend", festivalCard);
}


function listFestivals() {
  const contentElement = document.querySelector("#content");
  const groupFilters = Array.from(document.querySelector("#container-filters-list").querySelector("#filters-list").querySelectorAll('button.active[filterType="group"]'), (button) => button.textContent);
  const regionFilters = Array.from(document.querySelector("#container-filters-list").querySelector("#filters-list").querySelectorAll('button.active[filterType="region"]'), (button) => button.textContent);
  const searchBar = document.querySelector("#search-bar");
  const searchResultsList = document.querySelector("#search-results");
  contentElement.innerHTML = "";
  fetchData().then(data => {
    for (const group in data) {
      if ((groupFilters.length == 0) || (groupFilters.includes(group))) {
        for (const region in data[group]) {
          if ((regionFilters.length == 0) || (regionFilters.includes(region))) {
            for (let i in data[group][region]) {
              festival = data[group][region][i];
              if (document.documentElement.clientWidth > 780) {
                if ((festival["name"].toLowerCase().includes(searchBar.value.toLowerCase()))) {
                  listFestival(group, region, festival);
                }
              } else {
                if (festival["name"].toLowerCase().includes(searchBar.value.toLowerCase()) || (searchBar.value.length == 0)) {
                  const searchResultItem = `<li><button onclick="displayFestival(\`${festival["name"]}\`);"><b>${festival["name"]}</b> (${region})</button></li>`;
                  searchResultsList.insertAdjacentHTML("beforeend", searchResultItem);
                }
                listFestival(group, region, festival);
              }
            }
          }
        }
      }
    }
  })
}


function searchDisplay() {
  const containerClose = document.querySelector("#container-close");
  const containerSearch = document.querySelector("#container-search");
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
  const clearSearchBarButton = document.querySelector("#clear-search-bar-button");
  const searchBar = document.querySelector("#search-bar");
  const searchResultsList = document.querySelector("#search-results");
  searchBar.value = searchValue;
  if (0 < searchBar.value.length) {
    clearSearchBarButton.classList.add("show");
  } else {
    clearSearchBarButton.classList.remove("show");
  }
  searchResultsList.innerHTML = "";
  listFestivals();
}


function displayFilters() {
  const filtersList = document.querySelector("#container-filters-list").querySelector("#filters-list");
  const searchBar = document.querySelector("#search-bar");
  fetchData().then(data => {
    for (const group in data) {
      const filterItem = `<li><button filterType="group" onclick="toggleGroupFilter(this);">${group}</button></li>`;
      filtersList.insertAdjacentHTML("beforeend", filterItem);
    }
  })
  searchResults(searchBar.value);
}


function toggleGroupFilter(button) {
  const groupFiltersList = document.querySelector("#container-filters-list").querySelector("#filters-list");
  const regionFiltersList = document.querySelector("#container-filters-list").querySelector("#filters-list");
  const searchBar = document.querySelector("#search-bar");
  if (button.classList.contains("active")) {
    button.classList.remove("active");
    groupFiltersList.querySelectorAll("li").forEach(li => {
      li.style.display = "block";
    });
    regionFiltersList.innerHTML = "";
    displayFilters();
  } else {
    button.classList.add("active");
    groupFiltersList.querySelectorAll("li").forEach(li => {
      const button = li.querySelector("button");
      if (!button.classList.contains("active")) {
        li.style.display = "none";
      }
    })
    fetchData().then(data => {
      for (const region in data[button.textContent]) {
        const filterItem = `<li><button filterType="region" onclick="toggleRegionFilter(this);">${region}</button></li>`;
        regionFiltersList.insertAdjacentHTML("beforeend", filterItem);
      }
    })
    searchResults(searchBar.value);
  }
}


function toggleRegionFilter(button) {
  const searchBar = document.querySelector("#search-bar");
  if (button.classList.contains("active")) {
    button.classList.remove("active");
  } else {
    button.classList.add("active");
  }
  searchResults(searchBar.value);
}


displayFilters();