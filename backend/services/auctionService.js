const path = require('path')
const fs = require('fs').promises
const AuctionModel = require('../models/AuctionModel')
const downloadAndParse = require('../scraper/downloadAndParse')

const resultFilePath = path.join(__dirname, '..', 'data', 'result.json')
const BATCH_SIZE = 1000

let cache = null
let cacheTime = 0
const CACHE_DURATION = 60 * 1000

async function syncNewData() {
  const data = await downloadAndParse()
  const indexedData = data.map((item, i) => ({ ...item, index: i + 1 }))
  await fs.writeFile(resultFilePath, JSON.stringify(indexedData, null, 2))

  const existingDocs = await AuctionModel.find(
    { index: { $in: indexedData.map((e) => e.index) } },
    { index: 1, _id: 0 }
  )
  const existingSet = new Set(existingDocs.map((e) => e.index))

  const toInsert = indexedData.filter((entry) => !existingSet.has(entry.index))

  let inserted = 0
  for (let i = 0; i < toInsert.length; i += BATCH_SIZE) {
    const batch = toInsert.slice(i, i + BATCH_SIZE)
    const result = await AuctionModel.insertMany(batch, { ordered: false })
    inserted += result.length
  }

  return {
    message:
      'Sync complete (unique index respected, only new records inserted)',
    totalParsed: indexedData.length,
    inserted,
    skipped: indexedData.length - inserted,
  }
}

async function getAllAuctions() {
  if (cache && Date.now() - cacheTime < CACHE_DURATION) {
    return cache
  }
  const allAuctions = await AuctionModel.find().sort({ publishedAt: -1 })
  const result = { total: allAuctions.length, results: allAuctions }
  cache = result
  cacheTime = Date.now()
  return result
}

async function clearAuctions() {
  const result = await AuctionModel.deleteMany({})
  return { message: 'All auctions cleared', deleted: result.deletedCount }
}

module.exports = {
  syncNewData,
  getAllAuctions,
  clearAuctions,
}
