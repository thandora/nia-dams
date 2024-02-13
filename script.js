import { bindToNode } from "./areaOverlay.js";
import { geoData } from "./loadData.js";
import { bindButtonEvents, buttonConstructor } from "./buttonConstructor.js";
import { centerData } from "./loadData.js";

const coordsDefault = [10.825004, 124.973758];

let map = L.map("map").setView(coordsDefault, 14);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 25,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// const centerNorthBalire = { lat: 10.822768169803306, lng: 124.97609138488771 };
// const btnNorth = document.querySelector("#btn-balire-north");
// bindToNode(map, btnNorth, geoData["balireNorth"], centerNorthBalire);

// const centerSouthBalire = { lat: 10.804220717725277, lng: 124.98106956481935 };
// const btnSouth = document.querySelector("#btn-balire-south");
// bindToNode(map, btnSouth, geoData["balireSouth"], centerSouthBalire);

for (const data of Object.entries(geoData)) {
  const rawSysName = data[0];
  const sysName = addSpace(rawSysName);
  const geoData = data[1];

  const center = centerData[rawSysName];
  const overLayButton = buttonConstructor(sysName);

  console.log(center);

  bindButtonEvents(overLayButton, center, map, geoData);
}

// Helper function
function addSpace(titleCasedString) {
  // Initialize an empty array to store words
  let words = [];

  // Start with the first word
  let currentWord = "";

  // Loop through each character in the title-cased string
  for (let i = 0; i < titleCasedString.length; i++) {
    const char = titleCasedString[i];

    // If the character is uppercase and it's not the first character
    if (char === char.toUpperCase() && i !== 0) {
      // Add the current word to the array
      words.push(currentWord);

      // Start a new word with the current character
      currentWord = char;
    } else {
      // If the character is not uppercase, add it to the current word
      currentWord += char;
    }
  }

  // Add the last word to the array
  words.push(currentWord);

  // Join the words with spaces and return the result
  let temp = words.join(" ");
  return temp.slice(0, 1).toUpperCase() + temp.slice(1);
}

// Helper functions. Remove/comment out if not needed
import { initTests } from "./helper.js";
initTests(map, geoData);
