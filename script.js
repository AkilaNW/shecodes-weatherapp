let temperature = document.getElementById("temperature");
let humidity = document.getElementById("humidity");
let description = document.getElementById("condition");
let speed = document.getElementById("wind-speed");

let locationSearch = document.getElementById("location_search");
let search = document.getElementById("search");
let userLocation = document.getElementById("location");
let date = document.getElementById("date");
let time = document.getElementById("time");

let todaysdate = new Date();

function getDay() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  date.innerHTML = days[todaysdate.getDay()];
}

function displayLocation() {
  userLocation.innerHTML = location_search.value;
}

function getTime() {
  let currentHours = todaysdate.getHours();
  let currentMinutes = todaysdate.getMinutes();
  time.innerHTML = `${currentHours}:${currentMinutes}`;
}

getTime();
getDay();

function getWeather() {
  let city = locationSearch.value;
  let units = "metric";
  let apiKey = "4039fb9ddeb3cf90381d650daf749a37";
  let apiEndpoint = "http://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;

  // let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=4039fb9ddeb3cf90381d650daf749a37`;

  let promise = fetch(apiUrl);
  promise
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      temperature.innerHTML = Math.round(data.main.temp) + "℃";
      userLocation.innerHTML = city;
      humidity.innerHTML = data.main.humidity + "% HUMIDITY";
      description.innerHTML = data.weather[0].description;
      speed.innerHTML = data.wind.speed + "MPH";
      console.log(data);
    });
}
