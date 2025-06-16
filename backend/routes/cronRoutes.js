const express = require('express')
const axios = require('axios')
const router = express.Router()

const BASE_URL = process.env.API_BASE_URL

router.post('/sync-auctions', async (req, res) => {
  res.status(200).json({ message: 'Sync triggered in background' })

  try {
    await axios.delete(`${BASE_URL}/api/auctions/clear`)
    const syncRes = await axios.post(`${BASE_URL}/api/auctions/new`)
    console.log('Background sync complete:', {
      inserted: syncRes.data.inserted,
      skipped: syncRes.data.skipped,
    })
  } catch (err) {
    console.error('Background sync failed:', err.message)
  }
})

module.exports = router
