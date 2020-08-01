//Matts resolution

function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
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
  let year = date.getFullYear();
  let month = months[date.getMonth()];
  let day = days[date.getDay()];
  let actualDay = date.getDate();

  return `${day} ${actualDay} ${month} ${year}`;
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
  }

  return `${hours}:${minutes}`;
}

//Current City Temperature
function showWheather(response) {
  let degreesNowElement = document.querySelector("#current-temp");
  let currentCityElement = document.querySelector("h1");
  let countryElement = document.querySelector("h2");
  let descriptionElement = document.querySelector("#current-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#current-date");
  let hourElement = document.querySelector("#current-time");
  let iconElement = document.querySelector("#icon");
  celsiusTemperature = response.data.main.temp;
  degreesNowElement.innerHTML = Math.round(celsiusTemperature);
  currentCityElement.innerHTML = response.data.name;
  countryElement.innerHTML = response.data.sys.country;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  hourElement.innerHTML = formatHours(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col">
            <
            >
            ${formatHours(forecast.dt * 1000)}
            </span>
   <img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
      />
                  <div class="temp">${Math.round(
                    forecast.main.temp_min
                  )}°|<strong>
                  ${Math.round(forecast.main.temp_max)}°</strong></div>
          </div>`;
  }
}

// Set City
function searchCity(city) {
  let apiKey = "994cfaf2a113ce08ce060fdaaac64122";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWheather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city");
  searchCity(city.value);
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

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let degreesNowElement = document.querySelector("#current-temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  degreesNowElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let degreesNowElement = document.querySelector("#current-temp");
  degreesNowElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

// Button Convert Temperatures: Celsius to Fahrenheit

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

searchCity("Porto");
