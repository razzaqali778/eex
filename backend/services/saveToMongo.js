const AuctionModel = require('../models/AuctionModel')

async function saveToMongo(newEntries = []) {
  if (!Array.isArray(newEntries) || !newEntries.length) return { inserted: 0 }

  let inserted = 0
  for (const entry of newEntries) {
    try {
      await AuctionModel.updateOne(
        { sourceFile: entry.sourceFile, publishedAt: entry.publishedAt },
        { $set: entry },
        { upsert: true }
      )
      inserted++
    } catch (err) {
      console.error('Mongo insert error:', err.message)
    }
  }

  return { inserted }
}

module.exports = saveToMongo
