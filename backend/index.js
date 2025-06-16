require('dotenv').config()
const express = require('express')
const cron = require('node-cron')
const compression = require('compression')
const cors = require('cors')
const auctionRoutes = require('./routes/auctionRoutes')
const cronRoutes = require('./routes/cronRoutes')

const connectDB = require('./config/db')
const axios = require('axios')

const app = express()
app.use(compression())
app.use(cors())
connectDB()
app.use(express.json())

const BASE_URL = process.env.API_BASE_URL
const PORT = process.env.PORT || 5000

app.use('/api/auctions', auctionRoutes)
app.use('/api/cron', cronRoutes)

// cron.schedule('0 8 * * *', async () => {
//   try {
//     console.log('Calling /clear route...')
//     await axios.delete(`${BASE_URL}/api/auctions/clear`)
//     console.log('Auctions cleared! Now syncing new data...')
//     const response = await axios.post(`${BASE_URL}/api/auctions/new`)
//     console.log('Auctions re-synced:', response.data)
//   } catch (err) {
//     console.error('Scheduled sync error:', err)
//   }
// })
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

server.timeout = 3000000

process.on('uncaughtException', (err) =>
  console.error('Uncaught Exception:', err)
)
process.on('unhandledRejection', (reason) =>
  console.error('Unhandled Rejection:', reason)
)
