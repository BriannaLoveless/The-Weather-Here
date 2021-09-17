const mymap = L.map("checkinMap").setView([0, 0], 1);
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

getData();
async function getData() {
  const response = await fetch("/api");
  const data = await response.json();

    for (item of data) {
      console.log(item)
        const marker = L.marker( [item.lat, item.lon] ).addTo(mymap);
        let txt = `Weather at ${item.lat}&deg;, ${item.lon}&deg;: ${item.weather.weather[0].description} with a temperature of ${kelToFar(item.weather.main.temp).toFixed(0)}&deg; F.`

      if(item.air.value < 0){
        txt += ' No air quality reading available.'
      } else {
        txt += `The concentration of particulate matter (${item.air.parameter}) is ${item.air.value} ${item.air.unit} last read on ${item.air.lastUpdated}.`;
      }

      marker.bindPopup(txt);

    }
  console.log(data);
}

const kelToFar = (k) => (k - 273.15) * 1.8 + 32;