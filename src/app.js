function displayTemperature(response) {
  let name = response.data.name;
  let description = response.data.weather[0].description;
  let temperature = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
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
}

function displayForecast() {
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
        <img
          src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png"
          alt="partly-cloudy"
          class="weather-forecast-icon"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-maximum">25° </span>
          <span class="weather-forecast-temperature-minimum">15°</span>
        </div>
      </div>
   `;
  });
  forecastHTML = forecastHTML + `  </div>`;
  forecastElement.innerHTML = forecastHTML;
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

function displayFarenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-element");
  temperatureElement.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
  celsiusLink.classList.remove("active");
  farenheitLink.classList.add("active");
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-element");
  temperatureElement.innerHTML = celsiusTemperature;
  farenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
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
  let dateTime = document.querySelector("#date-time");
  dateTime.innerHTML = `${day}, ${hours}:${minutes}`;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let farenheitLink = document.querySelector("#farenheit-link");
let celsiusLink = document.querySelector("#celsius-link");

farenheitLink.addEventListener("click", displayFarenheitTemperature);
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let celsiusTemperature = null;

currentTime();

displayForecast();
