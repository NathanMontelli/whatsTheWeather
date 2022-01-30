let apiKey = '6e9e04a90ed0a53f68334469adb2a05f'
citySubmit = []

searchedCities()

// document.addEventListener('click', event => {
//   if (event.target.className.split(' ')[0] === 'btn') {
//     event.preventDefault()
//     getCity(event.target.innerHTML)
//     getCurrent(event.target.innerHTML)
//   }
// })

form.addEventListener('submit', event => {
  event.preventDefault()
  city = document.getElementById('submit').value
  console.log(city)

  axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`)
    .then(res => {
      let cityWeather = res.data
      console.log(cityWeather)
      let uviCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityWeather.coord.lat}&lon=${cityWeather.coord.lon}&exclude="hourly,daily"&appid=${apiKey}`
      axios.get(uviCall)
        .then(res => {
          let uviData = res.data
          console.log(uviData)
          $('#currentWeather').text("")
          $('#currentWeather').append(`
        <p class="info">${cityWeather.name}
        <img src="https://openweathermap.org/img/w/${cityWeather.weather[0].icon}.png"  alt="weather icon"><br>
       <span> Temperature: ${cityWeather.main.temp} ºF</span><br>
       <span> Humidity: ${cityWeather.main.humidity} %</span><br>
       <span> Wind Speed: ${cityWeather.wind.speed} MPH </span><br>
        <span id="uvi"> Uvi: ${uviData.current.uvi}</span >
        `)
          let uvi = uviData.current.uvi
          function uviColor() {
            if (uvi > 10) {
              document.getElementById('uvi').style.background = 'purple'
            } else if (uvi > 7) {
              document.getElementById('uvi').style.background = 'red'
            } else if (uvi > 5) {
              document.getElementById('uvi').style.background = 'orange'
            } else if (uvi > 2) {
              document.getElementById('uvi').style.background = 'yellow'
            } else {
              document.getElementById('uvi').style.background = 'green'
            }
          }
          uviColor()
        })
      citySubmit.push(city)
      localStorage.setItem('cities', JSON.stringify(citySubmit))
      cityWeather.city
      city.city
      document.getElementById('submit').value = ''
      searchedCities()

    })
})

function searchedCities() {
  document.getElementById('saved').innerHTML = ' '
  searches = JSON.parse(localStorage.getItem('cities') || "[]")
  searches.forEach(cities => {
    document.getElementById('saved').innerHTML += `<button type = "button" class="btn btn-info">${cities}</button><hr>`

  })
}

form.addEventListener('submit', event => {
  event.preventDefault()
  city = document.getElementById('submit').value
  console.log(city)
  axios.get((`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`))
    .then(res => {
      let forecast = res.data
      console.log(forecast)
      // for (let i = 0; i <= 40; i += 8) {
        document.getElementById('fiveDayForecast').innerHTML = `
    <div class="card" style="width: 10rem;">
  <div class="card-body">
    <h5 class="card-title">${forecast.list[7].dt_txt}</h5>
    <img src="https://openweathermap.org/img/w/${forecast.list[7].weather[0].icon}.png" class="card-img-top" alt="weather icon">
    <p class="card-text">Temp: ${forecast.list[7].main.temp}°F</p
    <p class="card-text">Humidity: ${forecast.list[7].main.humidity}%</p
  </div>
</div

 <div class="card" style="width: 10rem;">
  <div class="card-body">
    <h5 class="card-title">${forecast.list[15].dt_txt}</h5>
    <img src="https://openweathermap.org/img/w/${forecast.list[15].weather[0].icon}.png" class="card-img-top" alt="weather icon">
    <p class="card-text">Temp: ${forecast.list[15].main.temp}°F</p
    <p class="card-text">Humidity: ${forecast.list[15].main.humidity}%</p
  </div>
</div

 <div class="card" style="width: 10rem;">
  <div class="card-body">
    <h5 class="card-title">${forecast.list[23].dt_txt}</h5>
    <img src="https://openweathermap.org/img/w/${forecast.list[23].weather[0].icon}.png" class="card-img-top" alt="weather icon">
    <p class="card-text">Temp: ${forecast.list[23].main.temp}°F</p
    <p class="card-text">Humidity: ${forecast.list[23].main.humidity}%</p
  </div>
</div

 <div class="card" style="width: 10rem;">
  <div class="card-body">
    <h5 class="card-title">${forecast.list[31].dt_txt}</h5>
    <img src="https://openweathermap.org/img/w/${forecast.list[31].weather[0].icon}.png" class="card-img-top" alt="weather icon">
    <p class="card-text">Temp: ${forecast.list[31].main.temp}°F</p
    <p class="card-text">Humidity: ${forecast.list[31].main.humidity}%</p
  </div>
</div

 <div class="card" style="width: 10rem;">
  <div class="card-body">
    <h5 class="card-title">${forecast.list[39].dt_txt}</h5>
    <img src="https://openweathermap.org/img/w/${forecast.list[39].weather[0].icon}.png" class="card-img-top" alt="weather icon">
    <p class="card-text">Temp: ${forecast.list[39].main.temp}°F</p
    <p class="card-text">Humidity: ${forecast.list[39].main.humidity}%</p
  </div>
</div>

    `
    
    })
})