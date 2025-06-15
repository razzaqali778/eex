require('dotenv').config()
const { parentPort, workerData } = require('worker_threads')
const mongoose = require('mongoose')
const connectDB = require('../config/db')
const AuctionModel = require('../models/AuctionModel')

async function run() {
  try {
    await connectDB()

    console.log('Received batch of size:', workerData.length)
    console.log('Sample op:', JSON.stringify(workerData[0], null, 2))

    const result = await AuctionModel.bulkWrite(workerData, { ordered: false })

    console.log('Worker Result:', result)

    parentPort.postMessage({
      inserted: result.upsertedCount || 0,
      matched: result.matchedCount || 0,
      modified: result.modifiedCount || 0,
    })
  } catch (err) {
    console.error('Worker Error:', err)
    parentPort.postMessage({ error: err.message })
  } finally {
    await mongoose.disconnect()
  }
}

run()
