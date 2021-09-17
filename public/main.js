if ("geolocation" in navigator) {
  console.log("geolocation available");
  navigator.geolocation.getCurrentPosition(async (position) => {
    let lat,lon,weather,air;
    try {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      document.getElementById("latitude").textContent = lat.toFixed(2);
      document.getElementById("longitude").textContent = lon.toFixed(2);
      const api_url = `weather/${lat},${lon}`;
      const response = await fetch(api_url);
      const json = await response.json();
      weather = json.weather;
      air = json.air_quality.results[0].measurements[0];
      document.getElementById("summary").textContent =
        weather.weather[0].description;
      document.getElementById("temperature").textContent = kelToFar(
        weather.main.temp
      ).toFixed(0);
      document.getElementById("aq_parameter").textContent = air.parameter;
      document.getElementById("aq_value").textContent = air.value;
      document.getElementById("aq_units").textContent = air.unit;
      document.getElementById("aq_date").textContent = air.lastUpdated;


    } catch (error) {
      console.error(error);
      air = { value: -1};
      document.getElementById("aq_parameter").textContent = "No air quality reading available";
      
    }

    const data = { lat, lon, weather, air };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const db_response = await fetch("/api", options);
    const db_json = await db_response.json();
    console.log(db_json);
  });
} else {
  console.log("geolocation not available");
}

const kelToFar = (k) => (k - 273.15) * 1.8 + 32;
