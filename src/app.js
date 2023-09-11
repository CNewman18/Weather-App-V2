function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="https://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt="partly-cloudy"
          class="weather-forecast-icon"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-maximum">${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-minimum">${Math.round(
            forecastDay.temp.min
          )}°</span>
          </div>
          </div>
          `;
    }
  });
  forecastHTML = forecastHTML + `  </div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(data) {
  let apiKey = "f3009e4852fa0a079dab291dabf020c4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function displayTemperature(response) {
  let name = response.data.name;
  let description = response.data.weather[0].description;
  let temperature = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let bodyElement = document.querySelector("body");
  let locationElement = document.querySelector("#location-element");
  let descriptionElement = document.querySelector("#description-element");
  let temperatureElement = document.querySelector("#temperature-element");
  let humidityElement = document.querySelector("#humidity-element");
  let windElement = document.querySelector("#wind-element");
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemperature = Math.round(response.data.main.temp);
  locationElement.innerHTML = name;
  descriptionElement.innerHTML = description;
  temperatureElement.innerHTML = temperature;
  humidityElement.innerHTML = humidity;
  windElement.innerHTML = wind;
  getForecast(response.data.coord);
  if (response.data.main.temp <= 10) {
    bodyElement.classList.add("cold");
    bodyElement.classList.remove("warm", "hot");
  }
  getForecast(response.data.coord);
  if ((response.data.main.temp <= 29, response.data.main.temp > 11)) {
    bodyElement.classList.add("warm");
    bodyElement.classList.remove("hot", "cold");
  }
  getForecast(response.data.coord);
  if (response.data.main.temp >= 30) {
    bodyElement.classList.add("hot");
    bodyElement.classList.remove("warm", "cold");
  }
}
function search(city) {
  let apiKey = "598e202570aa8399fc1c4fb7e14a72a5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function currentTime() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let dateTime = document.querySelector("#date-time");
  dateTime.innerHTML = `${day}, ${hours}:${minutes}`;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let farenheitLink = document.querySelector("#farenheit-link");
let celsiusLink = document.querySelector("#celsius-link");

currentTime();
