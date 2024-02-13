import { bindToNode } from "./areaOverlay.js";

function buttonConstructor(sysName) {
  const navLinkContainer = document.createElement("li");

  const btnOverlay = document.createElement("button");
  btnOverlay.classList.add("btn-nav-overlay");

  const btnCenter = document.createElement("span");
  btnCenter.classList.add("material-symbols-outlined");
  btnCenter.classList.add("btn-nav-center");
  btnCenter.textContent = "explore_nearby";

  // TODO make marker button
  // const btnMarker = document.createElement("button");

  btnOverlay.textContent = sysName;
  navLinkContainer.append(btnOverlay, btnCenter);

  // Insert new button to classname
  document.querySelector(".navbar").appendChild(navLinkContainer);
  
  return navLinkContainer;
}

// TODO redundant function
function bindButtonEvents(button, center, map, data) {
  bindToNode(map, button, data, center);
}

export { buttonConstructor, bindButtonEvents };

