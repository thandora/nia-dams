async function loadFile(dir) {
  const response = await fetch(dir);
  const json = await response.json();
  const features = json["features"];
  const locName = json["name"];
  return { locName, features };
}

// Directory of .geojson files
const directories = [
  "./geos/balire-north.geojson",
  "./geos/balire-south.geojson",
  "./geos/bao.geojson",
  "./geos/mainit.geojson",
];

async function loadData(dirs) {
  const data = {};
  for (const dir of dirs) {
    const d = await loadFile(dir);
    const nameCamelCase =
      d["locName"].slice(0, 1).toLowerCase() + d["locName"].slice(1);
    data[nameCamelCase] = d;
  }

  return data;
}

const centerData = {
  balireNorth: { lat: 10.822768169803306, lng: 124.97609138488771 },
  balireSouth: { lat: 10.804220717725277, lng: 124.98106956481935 },
  bao: { lat: 11.126764909429827, lng: 124.58609974848302 },
  mainit: { lat: 11.21846227086063, lng: 124.82465431127622 },
};

const geoData = await loadData(directories);
export { geoData, centerData };
