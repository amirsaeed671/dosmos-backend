const axios = require('axios')

async function picOfDayController(req, res) {
  try {
    const response = await axios(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`,
    )
    res.status(200).json(response.data)
  } catch (error) {
    res.status(500).json({status: 500, message: 'Error in Saving'})
  }
}

async function galleryController(req, res) {
  try {
    const month = new Date().getMonth() + 1
    const date = new Date().getDate() - 10
    const year = new Date().getFullYear()
    const earthDate = `${year}-${month < 10 ? '0' : ''}${month}-${
      date < 10 ? '0' : ''
    }${date}`
    const response = await axios(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=${process.env.API_KEY}&earth_date=${earthDate}`,
    )
    res.status(200).json(response.data)
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Server Error',
    })
  }
}

module.exports = {picOfDayController, galleryController}
