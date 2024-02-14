function blackStyle(feature) {
  return {
    color: "black",
    weight: 2,
  };
}

function hoverStyle(feature) {
  return {
    color: "#5e60e4",
    weight: 4,
  };
}

// TODO mapObject redundant?
function initAreaOverlay(geoData, mapObject, infoObject) {
  function hoverHandler(event) {
    let currentLayer = event.target;

    currentLayer.setStyle(hoverStyle());
    currentLayer.bringToFront();

    infoObject.update(currentLayer.feature.properties);
  }

  function mouseOutHandler(event) {
    layer.setStyle(blackStyle);
    infoObject.update();
  }

  function onEach(feature, layer) {
    layer.on({
      mouseover: hoverHandler,
      mouseout: mouseOutHandler,
    });
  }

  const layer = L.geoJSON(geoData, {
    onEachFeature: onEach,
    style: blackStyle,
  });

  return layer;
}

function initInfo(map) {
  // Info box
  let info = L.control();

  info.onAdd = function (map) {
    // Create a div with a class "info"
    this.divAreaInfo = L.DomUtil.create("div", "info");
    this.update();
    return this.divAreaInfo;
  };

  info.update = function (properties) {
    let innerHtml;

    if (properties) {
      innerHtml =
        `<b>Region ${properties["Region"]}, ${properties["pro_name"]}</b><br>` +
        `${properties["Sys_Name"]}<br>` +
        `Area: ${properties["area"]} hectares<br>` +
        `IA: ${properties["ia"]}<br>` +
        `FUSA: ${properties["fusa"]}<br>`+
        `DIVISION: ${properties["division"]}`;
    } else {
      innerHtml = "Hover over an area";
    }

    this.divAreaInfo.innerHTML = innerHtml;
  };

  return info;
}

function addMarker() {
  // Add a marker to the map
  const marker = L.marker([center]).addTo(map);
}

const info = initInfo(map);

function bindToNode(map, nodeBtnContainer, geoData, center) {
  const overlayLayer = initAreaOverlay(geoData, map, info);

  // Create info box only ONCE.
  if (!map.hasLayer(info)) {
    info.addTo(map);
  }

  const btnOverlay = nodeBtnContainer.querySelector(".btn-nav-overlay",);
  btnOverlay.addEventListener("click", () => {
    if (map.hasLayer(overlayLayer)) {
      map.removeLayer(overlayLayer);
    } else {
      overlayLayer.addTo(map);
      map.setView(center, 13);
      
      // const marker =  L.marker([center]).addTo(map);
    }
  });


  // btnOverlay.classList.add("btn-nav");
  //  btnCenter.classList.add("btn-center");

  const btnCenter = nodeBtnContainer.querySelector(`.btn-nav-center`);
  btnCenter.addEventListener("click", () => {
    map.setView(center, 15);
  });
}

export { bindToNode, initInfo };
