const mongoose = require('mongoose')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {
  console.log('Database connected')
})

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
  await Campground.deleteMany({})
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000)
    const price = Math.floor(Math.random() * 20) + 10
    const camp = new Campground({
      // YOUR USER ID
      author: '631621e8044472a1ceef9873',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      geometry: {
        type: 'Point',
        coordinates: [cities[random1000].longitude, cities[random1000].latitude]
      },
      images: [
        {
          url: 'https://res.cloudinary.com/pungrumpy/image/upload/v1662737837/YelpCamp/eluuizcavxn8yhjekc9c.jpg',
          filename: 'YelpCamp/eluuizcavxn8yhjekc9c'
        },
        {
          url: 'https://res.cloudinary.com/pungrumpy/image/upload/v1662737842/YelpCamp/uy9zp7vxbb2ra7dc4iza.jpg',
          filename: 'YelpCamp/uy9zp7vxbb2ra7dc4iza'
        }
      ],
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius dignissimos velit officia molestias impedit. Cum beatae, odit doloremque similique consectetur placeat eos amet reiciendis tempore reprehenderit dignissimos a adipisci voluptates.',
      price
    })
    await camp.save()
  }
}

seedDB().then(() => {
  mongoose.connection.close()
})
