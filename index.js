let searchBox = document.querySelector(".search-box");

searchBox.addEventListener("keypress", setQuery);

function setQuery(event) {
  if (event.keyCode == 13) {
    getDataFromWeatherApi(searchBox.value);
  }
}

function getDataFromWeatherApi(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=7e3f21edee540e6110af347b55eb1ab2`
  )
    .then((res) => res.json())
    .then((res) => displayResults(res));
}

function displayResults(weatherData) {
  let city = document.querySelector(".city");
  city.innerText = `${weatherData.name}, ${weatherData.sys.country}`;

  let temperature = document.querySelector(".temperature");
  temperature.innerText = `${Math.round(weatherData.main.temp)}°C`;

  let now = new Date();
  let date = document.querySelector(".date");
  date.innerText = dateBuilder(now);

  let weather = document.querySelector(".weather");
  weather.innerText = weatherData.weather[0].main;

  let minMaxTemperature = document.querySelector(".min-max-temperature");
  minMaxTemperature.innerText = `${Math.round(weatherData.main.temp_min)}°C / ${Math.round(weatherData.main.temp_max)}°C`;
}

function dateBuilder(dateData) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[dateData.getDay()];
  let date = dateData.getDate();
  let month = months[dateData.getMonth()];
  let year = dateData.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
