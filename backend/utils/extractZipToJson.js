const fs = require('fs')
const path = require('path')
const AdmZip = require('adm-zip')
const xlsx = require('xlsx')

const extractZipToJson = (zipPath, outputDir) => {
  const zipName = path.basename(zipPath, '.zip')
  const extractPath = path.join(outputDir, zipName)

  if (!fs.existsSync(extractPath)) {
    fs.mkdirSync(extractPath, { recursive: true })
    const zip = new AdmZip(zipPath)
    zip.extractAllTo(extractPath, true)
  }

  const results = []

  const walk = (dir) => {
    fs.readdirSync(dir).forEach((file) => {
      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)

      if (stat.isDirectory()) {
        walk(filePath)
      } else if (filePath.endsWith('.xlsx') || filePath.endsWith('.xls')) {
        const parsed = parseAuctionSheet(filePath)
        results.push(...parsed)
      }
    })
  }

  walk(extractPath)

  const jsonPath = path.join(outputDir, `${zipName}.json`)
  fs.writeFileSync(jsonPath, JSON.stringify(results, null, 2))

  console.log(`✅ JSON saved: ${jsonPath}`)
  return results
}

const parseAuctionSheet = (filePath) => {
  const workbook = xlsx.readFile(filePath)
  const sheet = workbook.Sheets[workbook.SheetNames[0]]
  const rows = xlsx.utils.sheet_to_json(sheet, { range: 4 })

  const result = []

  for (const row of rows) {
    const region = row.__EMPTY
    const tech = row.__EMPTY_1
    const volumeAuctioned = row.__EMPTY_2
    const volumeAllocated = row.__EMPTY_3
    const weightedAvgPrice = row.__EMPTY_4
    const winners = row.__EMPTY_8

    if (!region || !tech) continue

    result.push({
      region,
      technology: tech,
      volumeAuctioned: parseFloat(volumeAuctioned) || 0,
      volumeAllocated: parseFloat(volumeAllocated) || 0,
      price: parseFloat(weightedAvgPrice) || null,
      winners: parseInt(winners) || 0,
      sourceFile: path.basename(filePath),
    })
  }

  return result
}

module.exports = extractZipToJson
