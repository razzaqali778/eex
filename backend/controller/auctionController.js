const auctionService = require('../services/auctionService')

exports.syncNewData = async (req, res) => {
  try {
    const result = await auctionService.syncNewData()
    res.json(result)
  } catch (err) {
    console.error('Sync error:', err.message)
    res.status(500).json({ error: 'Failed to sync', details: err.message })
  }
}

exports.getAllAuctions = async (req, res) => {
  try {
    const result = await auctionService.getAllAuctions()
    res.json(result)
  } catch (err) {
    console.error('Failed to fetch from Mongo:', err.message)
    res.status(500).json({ error: 'Failed to fetch data from MongoDB' })
  }
}

exports.clearAuctions = async (req, res) => {
  try {
    const result = await auctionService.clearAuctions()
    console.log(`Deleted ${result.deleted} auctions`)
    res.json(result)
  } catch (err) {
    console.error('Failed to delete auctions:', err)
    res.status(500).json({ error: 'Failed to clear auctions' })
  }
}
