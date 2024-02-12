import { geoData } from "./loadData.js";

const coordsDolina = [11.193004, 125.003758];

let map = L.map("map").setView(coordsDolina, 10);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 25,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// const gLayer = L.geoJSON(geoData[0]["features"]);
// gLayer.setStyle(styles);

// function styles(feature) {
//   return {
//     color: "black",
//   };
// }

// function onEachFeatures(feature, layer) {
//   // does this feature have a property named popupContent?
//   if (feature.properties && feature.properties.popupContent) {
//     layer.bindPopup(feature.properties.popupContent);
//   }
// }
// gLayer.addTo(map);
