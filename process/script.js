// script to write new properties to geojson file from csv based on matching IDs

const fs = require("fs");
const csv = require("csvtojson");

const geoData = fs.readFileSync("counties.geo.json");
const geoDataParse = JSON.parse(geoData);

const csvFilePath = "countyusage.csv";

function parser() {
  csv()
    .fromFile(csvFilePath)
    .then(jsonObj => {
      async function addNew() {
        // console.log(jsonObj[1]);
        for (const row of jsonObj) {
          geoDataParse.features.forEach(e => {
            if (row.GEO === e.properties.GEO_ID) {
              e.properties.freshPer = parseFloat(row.freshPer);
            }
          });
        }
      }
      async function write() {
        fs.writeFileSync(
          "revisedcounties2.geo.json",
          JSON.stringify(geoDataParse)
        );
        console.log("*** *** *** *** ***");
      }
      addNew().then(write());
    });
}
parser();
