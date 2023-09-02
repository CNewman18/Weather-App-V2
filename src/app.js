function displayTemperature(response) {
  console.log(response.data);
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
  celsiusTemperature = Math.round(response.data.main.temp);
  locationElement.innerHTML = name;
  descriptionElement.innerHTML = description;
  temperatureElement.innerHTML = temperature;
  humidityElement.innerHTML = humidity;
  windElement.innerHTML = wind;
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

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function displayFarenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-element");
  temperatureElement.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-element");
  temperatureElement.innerHTML = celsiusTemperature;
}

let farenheitLink = document.querySelector("#farenheit-link");
let celsiusLink = document.querySelector("#celsius-link");

farenheitLink.addEventListener("click", displayFarenheitTemperature);
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let celsiusTemperature = null;
