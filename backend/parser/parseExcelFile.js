const xlsx = require('xlsx')
const path = require('path')

function parseExcelFile(filePath) {
  const workbook = xlsx.readFile(filePath)
  const sheet = workbook.Sheets[workbook.SheetNames[0]]
  const rows = xlsx.utils.sheet_to_json(sheet, { range: 4, defval: '' })

  const fileName = path.basename(filePath)
  const publishedAt = extractDate(fileName)
  const auctionMonth = extractMonth(fileName)

  const result = []

  for (const row of rows) {
    const region = row['Région / Region'] || row.__EMPTY || ''
    const tech = row['Technologie / Technology'] || row.__EMPTY_1 || ''
    const volumeAuctioned = row['Total Volume Auctionned'] || row.__EMPTY_2
    const volumeSold = row['Total Volume Sold'] || row.__EMPTY_3
    const price = row['Weighted Average Price (€ / MWh)'] || row.__EMPTY_4
    const myVol = row['My Total Volume'] || row.__EMPTY_5
    const myPrice = row['My Weighted Average Price (€ / MWh)'] || row.__EMPTY_6
    const winners =
      row['Number of winners per couple region/technology'] || row.__EMPTY_7

    result.push({
      region,
      technology: tech,
      volumeAuctioned: parseFloat(volumeAuctioned) || 0,
      volumeAllocated: parseFloat(volumeSold) || 0,
      price: parseFloat(price) || null,
      myVolume: parseFloat(myVol) || null,
      myPrice: parseFloat(myPrice) || null,
      winners: parseInt(winners) || 0,
      sourceFile: fileName,
      publishedAt,
      auctionMonth,
    })
  }

  return result
}

function extractDate(fileName) {
  const match = fileName.match(/^(\d{4})(\d{2})(\d{2})/)
  return match ? `${match[1]}-${match[2]}-${match[3]}` : null
}

function extractMonth(fileName) {
  const match = fileName.match(
    /_(January|February|March|April|May|June|July|August|September|October|November|December)_(\d{4})/
  )
  return match ? `${match[1]} ${match[2]}` : null
}

module.exports = parseExcelFile
