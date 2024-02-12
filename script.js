import { bindToNode } from "./areaOverlay.js";
import { geoData } from "./loadData.js";

const coordsDefault = [10.825004, 124.973758];

let map = L.map("map").setView(coordsDefault, 14);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 25,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const centerNorthBalire = { lat: 10.822768169803306, lng: 124.97609138488771 };
const btnNorth = document.querySelector("#btn-balire-north");
bindToNode(map, btnNorth, geoData["balireNorth"], centerNorthBalire);

const centerSouthBalire = { lat: 10.804220717725277, lng: 124.98106956481935 };
const btnSouth = document.querySelector("#btn-balire-south");
bindToNode(map, btnSouth, geoData["balireSouth"], centerSouthBalire);

// Helper functions. Remove/comment out if not needed
import { initTests } from "./helper.js";
initTests(map, geoData);
