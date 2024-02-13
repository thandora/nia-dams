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
        `<b>Region ${properties["Region"]}, ${properties["Pro_Name"]}</b><br>` +
        `${properties["Sys_Name"]}<br>` +
        `Area: ${properties["area"]} hectares (1 hectare = 10000m<sup>2</sup>)`;
    } else {
      innerHtml = "Hover over an area";
    }

    this.divAreaInfo.innerHTML = innerHtml;
  };

  return info;
}

const info = initInfo(map);

function bindToNode(map, nodeButton, geoData, center) {
  const overlayLayer = initAreaOverlay(geoData, map, info);

  // Create info box only ONCE.
  if (!map.hasLayer(info)) {
    info.addTo(map);
  }

  nodeButton.addEventListener("click", () => {
    if (map.hasLayer(overlayLayer)) {
      map.removeLayer(overlayLayer);
    } else {
      overlayLayer.addTo(map);
    }
  });

  const btnClassName = nodeButton.className;
  const btnCenter = document.querySelector(`.${btnClassName}+.btn-center`);
  btnCenter.addEventListener("click", () => {
    map.setView(center);
  });
}

export { bindToNode, initInfo };
