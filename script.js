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

  return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours} `;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function displayTemperature(response) {
  let temperature = document.getElementById("current");
  let cityElement = document.getElementById("city");
  let humidity = document.getElementById("humidity");
  let speed = document.getElementById("wind-speed");
  let iconElement = document.getElementById("icon");
  let descriptionElement = document.getElementById("condition");
  let dateElement = document.getElementById("date");
  let feelElement = document.getElementById("real-feel");

  celciusTemp = response.data.main.temp;

  feelElement.innerHTML =
    "RealFeel®" + Math.round(response.data.main.feels_like) + "°";
  temperature.innerHTML = Math.round(celciusTemp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = "Humidity: " + response.data.main.humidity + "%";
  speed.innerHTML = "Wind: " + response.data.wind.speed + "MPH";
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function displayForecast(response) {
  let forecastElement = document.getElementById("forecast");
  let forecast = response.data.list[0];
  console.log(forecast);

  forecastElement.innerHTML = `
         <div class="col-2">
         <h3> ${formatHours(forecast.dt * 1000)}</h3>
        <br />
        <img src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png" />
        <div class="weekly-temp">
        <strong>${Math.round(forecast.main.temp_max)}°</strong>/${Math.round(
    forecast.main.temp_min
  )}°
        </div>
        </div>
        `;

  forecast = response.data.list[1];
  forecastElement.innerHTML += `
         <div class="col-2">
         <h3> ${formatHours(forecast.dt * 1000)}</h3>
        <br />
        <img src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png" />
        <div class="weekly-temp">
        <strong>${Math.round(forecast.main.temp_max)}°</strong>/${Math.round(
    forecast.main.temp_min
  )}°
        </div>
        </div>
        `;

  forecast = response.data.list[2];
  forecastElement.innerHTML += `
         <div class="col-2">
         <h3> ${formatHours(forecast.dt * 1000)}</h3>
        <br />
        <img src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png" />
        <div class="weekly-temp">
        <strong>${Math.round(forecast.main.temp_max)}°</strong>/${Math.round(
    forecast.main.temp_min
  )}°
        </div>
        </div>
        `;

  forecast = response.data.list[3];
  forecastElement.innerHTML += `
        <div class="col-2">
        <h3> ${formatHours(forecast.dt * 1000)}</h3>
        <br />
        <img src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png" />
        <div class="weekly-temp">
        <strong>${Math.round(forecast.main.temp_max)}°</strong>/${Math.round(
    forecast.main.temp_min
  )}°
        </div>
        </div>
        `;

  forecast = response.data.list[4];
  forecastElement.innerHTML += `
        <div class="col-2">
        <h3> ${formatHours(forecast.dt * 1000)}</h3>
        <br />
        <img src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png" />
        <div class="weekly-temp">
        <strong>${Math.round(forecast.main.temp_max)}°</strong>/${Math.round(
    forecast.main.temp_min
  )}°
        </div>
        </div>
        `;

  forecast = response.data.list[5];
  forecastElement.innerHTML += `
        <div class="col-2">
        <h3> ${formatHours(forecast.dt * 1000)}</h3>
        <br />
        <img src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png" />
        <div class="weekly-temp">
        <strong>${Math.round(forecast.main.temp_max)}°</strong>/${Math.round(
    forecast.main.temp_min
  )}°
        </div>
        </div>
        `;
}

function search(city) {
  let apiKey = "4039fb9ddeb3cf90381d650daf749a37";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.getElementById("locate-input");
  search(cityInput.value);
}

function displayFarenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.getElementById("current");

  celciusLink.classList.remove("active");
  farenheitLink.classList.add("active");

  let farenheiTemp = (celciusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farenheiTemp);
}

function displayCelciusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.getElementById("current");

  farenheitLink.classList.remove("active");
  celciusLink.classList.add("active");

  temperatureElement.innerHTML = Math.round(celciusTemp);
}

let celciusTemp = null;

let form = document.querySelector("#form-input");
form.addEventListener("submit", handleSubmit);

let farenheitLink = document.getElementById("farenheit-link");
farenheitLink.addEventListener("click", displayFarenheitTemp);

let celciusLink = document.getElementById("celcius-link");
celciusLink.addEventListener("click", displayCelciusTemp);

search("New York");
