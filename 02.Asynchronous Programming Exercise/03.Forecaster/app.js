function attachEvents() {
  const locationInp = document.querySelector("#location");
  const submitBtn = document.querySelector("#submit");
  submitBtn.addEventListener("click", getWeather);
  const forecastDiv = document.querySelector("#current");
  const forecast3DayDiv = document.querySelector("#upcoming");
  const baseUri = "http://localhost:3030/jsonstore/forecaster/";

  async function getWeather() {
    forecastDiv.parentElement.style.display = "block";
    const location = locationInp.value;
    locationInp.value = "";
    try {
      const response = await fetch(baseUri + "locations");
      const data = await response.json();
      const foundLocationObj = data.find((el) => el.name === location);
      const code = foundLocationObj.code;

      const forecastObj = await getForecast(code);
      createDayCard(
        forecastObj.name,
        forecastObj.forecast.low,
        forecastObj.forecast.high,
        forecastObj.forecast.condition
      );

      const threeDayForecastObj = await get3Dayforecast(code);
      let threeDayText = "";
      threeDayForecastObj.forecast.forEach(
        (el) =>
          (threeDayText += createOneThreeDayCard(el.low, el.high, el.condition))
      );
      let curDiv = document.createElement("div");
      curDiv.classList.add("forecast-info");
      curDiv.innerHTML = threeDayText;
      if (forecast3DayDiv.children[1]) {
        forecast3DayDiv.children[1].remove();
      }
      forecast3DayDiv.appendChild(curDiv);
    } catch (error) {
      forecastDiv.parentElement.textContent = "Error";
    }
  }

  async function getForecast(code) {
    const res = await fetch(baseUri + "today/" + code);
    const forecastData = res.json();
    return forecastData;
  }

  async function get3Dayforecast(code) {
    const res = await fetch(baseUri + "upcoming/" + code);
    const forecastData = res.json();
    return forecastData;
  }

  function createDayCard(name, low, high, condition) {
    let text = `    
<span class="condition symbol">${weatherTemplate[condition]}</span>
<span class="condition">
    <span class="forecast-data">${name}</span>
    <span class="forecast-data">${low}${weatherTemplate.Degrees}/${high}${weatherTemplate.Degrees}</span>
    <span class="forecast-data">${condition}</span>
</span>`;

    let curDiv = document.createElement("div");
    curDiv.classList.add("forecasts");
    curDiv.innerHTML = text;
    if (forecastDiv.children[1]) {
      forecastDiv.children[1].remove();
    }
    forecastDiv.appendChild(curDiv);
  }

  function createOneThreeDayCard(low, high, condition) {
    let spanText = `
    <span class="upcoming">
    <span class="symbol">${weatherTemplate[condition]}</span>
    <span class="forecast-data">${low}${weatherTemplate.Degrees}/${high}${weatherTemplate.Degrees}</span>
    <span class="forecast-data">${condition}</span>
</span>`;
    return spanText;
  }

  const weatherTemplate = {
    Sunny: "&#x2600;",
    "Partly sunny": "&#x26C5;",
    Overcast: "&#x2601;",
    Rain: "&#x2614;",
    Degrees: "&#176;",
  };
}

attachEvents();
