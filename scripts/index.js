const container_navigation = document.getElementById("container-navigation");
const navigation_button_image = document.getElementById("navigation-button-image");
const regions = document.querySelectorAll("[region]");


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