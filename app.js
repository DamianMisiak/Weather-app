const apiKey = 'b436619d8860ef0f46d0aca7ae18b1ef'
const express = require('express')
const app = express()
const axios = require('axios')
const port = process.env.PORT || 3000

app.set('view engine', 'hbs')
app.use(express.static("public"))

app.get('/', (req, res) => {
  res.render('index', { weather: null, error: null })
})
app.get('/weather', async (req, res) => {
  const city = req.query.city
  const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  let weather = null
  let error = null
  try {
    const response = await axios.get(APIUrl)
    weather = response.data
    weather.main.temp = Math.round(weather.main.temp)
  } catch (e) {
    error = e.response.data.message
  }
  res.render('index', { weather, error, city })
})

app.listen(port)