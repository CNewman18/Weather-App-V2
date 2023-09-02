let city = "yeste";
let apiKey = "598e202570aa8399fc1c4fb7e14a72a5";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

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
  locationElement.innerHTML = name;
  descriptionElement.innerHTML = description;
  temperatureElement.innerHTML = temperature;
  humidityElement.innerHTML = humidity;
  windElement.innerHTML = wind;
}

axios.get(apiUrl).then(displayTemperature);
