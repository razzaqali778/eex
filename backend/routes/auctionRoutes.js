const express = require('express')
const router = express.Router()
const auctionController = require('../controller/auctionController')

router.post('/new', auctionController.syncNewData)
router.get('/all', auctionController.getAllAuctions)
router.delete('/clear', auctionController.clearAuctions)

module.exports = router
