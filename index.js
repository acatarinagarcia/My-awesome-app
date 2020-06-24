//Set Time

let now = new Date();

let currentDate = document.querySelector("#current-date");
let currentTime = document.querySelector("#current-time");

let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();

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

let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
currentDate.innerHTML = `${day} ${month} ${date}, ${year}`;
currentTime.innerHTML = `${hours}:${minutes}`;

// Button Convert Temperatures: Celsius to Fahrenheit
function choosecelsius(event) {
  event.preventDefault();
  let temperaturenow = document.querySelector("#current-temp");
  temperaturenow.innerHTML = celsius;
}

function choosefahrenheit(event) {
  event.preventDefault();

  let temperaturenow = document.querySelector("#current-temp");
  temperaturenow.innerHTML = `${Math.round((24 * 9) / 5 + 32)}`;
}
let fahrenheitnow = document.querySelector("#fahrenheit-link");
fahrenheitnow.addEventListener("click", choosefahrenheit);

let celsiusnow = document.querySelector("#celsius-link");
celsiusnow.addEventListener("click", choosecelsius);

//Current City Temperature
function showWheather(response) {
  let degreesNowElement = document.querySelector("#current-temp");
  let currentCityElement = document.querySelector("h1");
  let countryElement = document.querySelector("h2");
  let descriptionElement = document.querySelector("#current-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  degreesNowElement.innerHTML = Math.round(response.data.main.temp);
  currentCityElement.innerHTML = response.data.name;
  countryElement.innerHTML = response.data.sys.country;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

// Set City
function searchCity(city) {
  let apiKey = "994cfaf2a113ce08ce060fdaaac64122";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWheather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  searchCity(city);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

// Geolocation button
function fetchPosition(position) {
  let apiKey = "994cfaf2a113ce08ce060fdaaac64122";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWheather);
}
function searchMyLocation() {
  navigator.geolocation.getCurrentPosition(fetchPosition);
}

let button = document.querySelector("#my-location");
button.addEventListener("click", searchMyLocation);

searchCity("Porto");
