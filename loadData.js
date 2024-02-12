async function loadFile(dir) {
  const response = await fetch(dir);
  const json = await response.json();
  const features = json["features"];
  const locName = json["name"];
  return { locName, features };
}

// Directory of .geojson files
const directories = ["./geos/balire-north.geojson", "./geos/balire-south.geojson"];

async function loadData(dirs) {
  const data = {};
  for (const dir of dirs) {
    const d = await loadFile(dir);
    const nameCamelCase = d["locName"].slice(0, 1).toLowerCase() + d["locName"].slice(1);
    data[nameCamelCase] = d;
  }

  return data;
}

const geoData = await loadData(directories);
export { geoData };
