import { geoData } from "./loadData.js";

const coordsDefault = [10.825004, 124.973758];

let map = L.map("map").setView(coordsDefault, 14);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 25,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

function blackStyle(feature) {
  return {
    color: "black",
    weight: 3,
  };
}

function hoverStyle(feature) {
  return {
    color: "#5e60e4",
    weight: 5,
  };
}

function hoverHandler(event) {
  let layer = event.target;

  layer.setStyle(hoverStyle());
  layer.bringToFront();

  info.update(layer.feature.properties);
}

function mouseOutHandler(event) {
  balireNorthLayer.setStyle(blackStyle);
  info.update();
}

function onEach(feature, layer) {
  layer.on({
    mouseover: hoverHandler,
    mouseout: mouseOutHandler,
  });
}
const balireNorthLayer = L.geoJSON(geoData["balireNorth"], {
  onEachFeature: onEach,
  style: blackStyle,
});

// Info box
var info = L.control();

info.onAdd = function (map) {
  this.divAreaInfo = L.DomUtil.create("div", "info"); // create a div with a class "info"
  this.update();
  return this.divAreaInfo;
};

// method that we will use to update the control based on feature properties passed
info.update = function (properties) {
  let innerHtml;
  // let innerHtml = properties["Sys_Name"];
  if (properties) {
    innerHtml =
      `<b>Region ${properties["Region"]}, ${properties["Pro_Name"]}</b><br>` +
      `${properties["Sys_Name"]}<br>` +
      `Area: ${properties["area"]} hectares (1 hectare = 10000m<sup>2</sup>)`;
  } else {
    innerHtml = "Hover over an area";
  }

  this.divAreaInfo.innerHTML = innerHtml;
};

info.addTo(map);

balireNorthLayer.addTo(map);

// function onEachFeatures(feature, layer) {
//   // does this feature have a property named popupContent?
//   if (feature.properties && feature.properties.popupContent) {
//     layer.bindPopup(feature.properties.popupContent);
//   }
// }
// gLayer.addTo(map);
