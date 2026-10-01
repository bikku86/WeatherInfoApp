let searchBox = document.querySelector(".search-box");

searchBox.addEventListener("keypress", setQuery);

function setQuery(event) {
  if (event.keyCode == 13) {
    getDataFromWeatherApi(searchBox.value | "Delhi");
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


function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    // Fallback if geolocation not supported
    getDataFromWeatherApi("New Delhi");
  }

  function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=7e3f21edee540e6110af347b55eb1ab2`
    )
      .then((res) => res.json())
      .then((res) => displayResults(res))
      .catch(() => {
        document.querySelector(".temperature").innerText = "Error fetching data";
      });
  }

  function error() {
    // If user denies location, fallback to default city
    getDataFromWeatherApi("New Delhi");
  }
}


// Load current city on page open
window.onload = () => {
  getDataFromWeatherApi("New Delhi");   // initial load
  getWeatherByLocation();               // then try geolocation
};
