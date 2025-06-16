const express = require('express')
const axios = require('axios')
const router = express.Router()

const BASE_URL = process.env.API_BASE_URL

router.post('/sync-auctions', async (req, res) => {
  try {
    console.log('External cron job triggered: clearing and syncing auctions...')

    const clearRes = await axios.delete(`${BASE_URL}/api/auctions/clear`)
    const newRes = await axios.post(`${BASE_URL}/api/auctions/new`)

    res.status(200).json({
      message: 'Auctions cleared and synced successfully',
      clearResult: clearRes.data,
      syncResult: newRes.data,
    })
  } catch (err) {
    console.error('Cron sync error:', err.message)
    res.status(500).json({ message: 'Sync failed', error: err.message })
  }
})

module.exports = router
