let apiKey = '6e9e04a90ed0a53f68334469adb2a05f'
citySubmit =[]

form.addEventListener('submit', event => {
  event.preventDefault()
  let city = document.getElementById('submit').value
  console.log(city)

  axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`)
    .then(res => {
      let cityWeather = res.data
      console.log(cityWeather)
      let uvi = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityWeather.city.coord.lat}&lon=${cityWeather.city.coord.lon}&exclude="hourly,daily"&appid=${apiKey}`
      axios.get(uvi)
      .then(res => {
        let uviData = res.data
        console.log(uviData)
      })
      citySubmit.push(city)
      localStorage.setItem('city', JSON.stringify(citySubmit))
      cityWeather.city
      city.city
      document.getElementById('submit').value = ''
      searchedCities()
    })
})

function searchedCities() {
  document.getElementById('saved').innerHTML = ' '
  searches = JSON.parse(localStorage.getItem('cities') || "[]")
  searches.forEach(city => {
    document.getElementById('saved').innerHTML += `<button type = "button" class="btn btn-info">${cities}</button><hr>`

  })
}