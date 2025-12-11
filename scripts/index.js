const clearSearchBarButton = document.querySelector("#clear-search-bar-button");
const containerSearch = document.querySelector("#container-search");
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