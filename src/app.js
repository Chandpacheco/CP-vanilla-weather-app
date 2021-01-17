function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let now = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[now.getDay()];
  return `${currentDay}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
    return `${hours}:${minutes}`;
  }
}

function displayForecast(response) {
  console.log(response);
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 1; index < 7; index++) {
    forecast = response.data.daily[index];

    forecastElement.innerHTML += `
   <div class="col-2">
              <h3>${formatDay(forecast.dt * 1000)}</h3>
              <img src="http://openweathermap.org/img/wn/${
                forecast.weather[0].icon
              }@2x.png" alt="${forecast.weather[0].icon}" />
              <div class="weather-forecast-temperature">
                <strong><span class ="forecast-max">${Math.round(
                  forecast.temp.max
                )}</span>°</strong> 
                <span class="forecast-min">${Math.round(
                  forecast.temp.min
                )}</span>°
              </div>
            </div>`;
  }
}

function displayTemperature(response) {
  console.log(response);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  let feelsLikeElement = document.querySelector("#feels-like");

  fahrenheitTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);

  let apiKey = "627c6f2c2be9acd5320a6d4d29514279";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&exclude=hourly,minutely&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayForecast);
}

function search(city) {
  let apiKey = "627c6f2c2be9acd5320a6d4d29514279";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayTemperature);
}

function showPosition(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = "627c6f2c2be9acd5320a6d4d29514279";
  apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&exclude=hourly,minutely&units=imperial`;

  axios.get(apiUrl).then(displayTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  let temperatureElement = document.querySelector("#temperature");
  let feelsLikeElement = document.querySelector("#feels-like");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  feelsLikeElement.innerHTML = Math.round(celsiusTemperature);

  document.querySelectorAll(".forecast-max").forEach(function (item) {
    let currentTemp = item.innerHTML;
    item.innerHTML = Math.round(((currentTemp - 32) * 5) / 9);
  });
  document.querySelectorAll(".forecast-min").forEach(function (item) {
    let currentTemp = item.innerHTML;
    item.innerHTML = Math.round(((currentTemp - 32) * 5) / 9);
  });

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  document.querySelectorAll(".forecast-max").forEach(function (item) {
    let currentMaxTemp = item.innerHTML;
    item.innerHTML = Math.round(currentMaxTemp * (9 / 5) + 32);
  });
  document.querySelectorAll(".forecast-min").forEach(function (item) {
    let currentMinTemp = item.innerHTML;
    item.innerHTML = Math.round(currentMinTemp * (9 / 5) + 32);
  });

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

let fahrenheitTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Lexington");
