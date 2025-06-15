const mongoose = require('mongoose')

const AuctionSchema = new mongoose.Schema(
  {
    region: String,
    technology: String,
    volumeAuctioned: Number,
    volumeAllocated: Number,
    price: Number,
    myVolume: Number,
    myPrice: Number,
    winners: Number,
    sourceFile: String,
    publishedAt: String,
    auctionMonth: String,
    index: {
      type: Number,
      unique: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('AuctionModel', AuctionSchema)
