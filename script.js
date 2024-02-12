import { bindToNode } from "./areaOverlay.js";
import { geoData } from "./loadData.js";

const coordsDefault = [10.825004, 124.973758];

let map = L.map("map").setView(coordsDefault, 14);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 25,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const btnNorth = document.querySelector("#btn-balire-north");
bindToNode(map, btnNorth, geoData["balireNorth"]);

const btnSouth = document.querySelector("#btn-balire-south");
bindToNode(map, btnSouth, geoData["balireSouth"]);
