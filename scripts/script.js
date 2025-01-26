const kelvin = 273.15;

const obtenerClima = (city, country) => {
  // hacer una condicion para que la primera ciudad en mostrarse sea caba

  consultarAPI(city, country);
};

const consultarAPI = async (city, country) => {
  const APIkey = "7cb92f19d242468809c2b32ea0cbb6b6";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${APIkey}`;

  console.log(url);

  const answer = await fetch(url);
  const result = await answer.json();

  console.log(result);

  if (result.cod == "404") {
    mostrarError("#msj-error", "404 ¡No coincide la Ciudad con el País!");
    return;
  }

  const { name, main, weather } = result;
  if (!name) return null;

  const image = weather[0].icon;
  console.log(image);

  let answerWeather = document.querySelector("#answerWeather");
  answerWeather.innerHTML = `
    <div class="card">
    
        <div class="container">
            <div class="wide-card">
                <h2 class="white-text">${name}</h2>
            </div>
            <div >
                <img class="weather-img" src="https://openweathermap.org/img/wn/${image}.png" alt="Weather icon">
            </div>
        </div>
        
        <div class="center">
            <h1 class="pad10 orange-text">${parseFloat(
              main.temp - kelvin,
              10
            ).toFixed(1)}°C</h1>
        </div>

        <div class="w100 pad-top10 container">
            <div class="mini-card">
                <h4 class="white-text">Temp. Máx:</h4>
                <h3 class="orange-text">${parseFloat(
                  main.temp_max - kelvin,
                  10
                ).toFixed(1)}°C</h3>
            </div>

            <div class="mini-card">
                <h4 class="white-text">Temp. Mín:</h4>
                <h3 class="orange-text">${parseFloat(
                  main.temp_min - kelvin,
                  10
                ).toFixed(1)}°C</h3>
            </div>
        </div>
        
        <div class="w100 container">
            <div class="mini-card">
                <h4 class="white-text">S. Térmica:</h4>
                <h3 class="orange-text">${parseFloat(
                  main.feels_like - kelvin,
                  10
                ).toFixed(1)}°C</h3>
            </div>
            <div class="mini-card">
                <h4 class="white-text">Humedad:</h4>
                <h3 class="orange-text">${main.humidity}%</h3>
            </div>
        </div>
    </div>`;
};

const mostrarError = (elemento, mensaje) => {
  divError = document.querySelector(elemento);
  divError.innerHTML = `<p>${mensaje}</p>`;
  setTimeout(() => {
    divError.innerHTML = ``;
  }, 3000);
};
