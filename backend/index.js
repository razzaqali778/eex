require('dotenv').config()
const express = require('express')
const compression = require('compression')
const cors = require('cors')
const auctionRoutes = require('./routes/auctionRoutes')
const cronRoutes = require('./routes/cronRoutes')

const connectDB = require('./config/db')

const app = express()
app.use(compression())
app.use(cors())
connectDB()
app.use(express.json())

const PORT = process.env.PORT || 5000

app.use('/api/auctions', auctionRoutes)
app.use('/api/cron', cronRoutes)

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
