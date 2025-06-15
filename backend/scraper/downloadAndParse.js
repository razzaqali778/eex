const fs = require('fs')
const path = require('path')
const axios = require('axios')
const cheerio = require('cheerio')
const AdmZip = require('adm-zip')
const parseExcelFile = require('../parser/parseExcelFile')

const extractAndFlattenXLSX = (zipPath, extractDir) => {
  const zip = new AdmZip(zipPath)
  zip.extractAllTo(extractDir, true)
  const foundFiles = []

  function walk(dir) {
    for (const entry of fs.readdirSync(dir)) {
      const fullPath = path.join(dir, entry)
      const stat = fs.statSync(fullPath)
      if (stat.isDirectory()) {
        walk(fullPath)
      } else if (entry.endsWith('.xlsx')) {
        const dest = path.join(extractDir, entry)
        if (!fs.existsSync(dest)) {
          fs.copyFileSync(fullPath, dest)
        }
        foundFiles.push(dest)
      }
    }
  }

  walk(extractDir)
  return foundFiles
}

const downloadAndParse = async () => {
  const baseURL = process.env.EEX_BASE_URL
  const siteRoot = process.env.EEX_SITE_ROOT

  const zipDir = path.join(__dirname, '..', 'data', 'zip')
  const extractBase = path.join(__dirname, '..', 'data', 'extracted')
  const outputJson = path.join(__dirname, '..', 'data', 'result.json')

  if (!fs.existsSync(zipDir)) fs.mkdirSync(zipDir, { recursive: true })
  if (!fs.existsSync(extractBase))
    fs.mkdirSync(extractBase, { recursive: true })

  const result = []

  try {
    const res = await axios.get(baseURL)
    const $ = cheerio.load(res.data)

    const links = $('a')
      .map((i, el) => $(el).attr('href'))
      .get()
      .filter((href) => href && href.toLowerCase().endsWith('.zip'))

    console.log('Found ZIPs:', links.length)

    for (const href of links) {
      const fullURL = href.startsWith('http') ? href : `${siteRoot}${href}`
      const fileName = path.basename(fullURL)
      const zipPath = path.join(zipDir, fileName)
      const extractDir = path.join(extractBase, fileName.replace('.zip', ''))

      if (!fs.existsSync(zipPath)) {
        try {
          const response = await axios.get(fullURL, {
            responseType: 'arraybuffer',
            timeout: 15000,
          })
          fs.writeFileSync(zipPath, response.data)
          console.log('Downloaded:', fileName)
        } catch (err) {
          console.error('Failed to download:', fullURL)
          console.error(err.message)
          continue
        }
      } else {
        console.log('Already exists:', fileName)
      }

      console.log('Extracting to:', extractDir)
      const xlsxFiles = extractAndFlattenXLSX(zipPath, extractDir)
      console.log('XLSX found:', xlsxFiles.length)

      for (const file of xlsxFiles) {
        const parsed = parseExcelFile(file)
        result.push(...parsed)
      }
    }

    fs.writeFileSync(outputJson, JSON.stringify(result, null, 2))
    console.log('JSON saved to:', outputJson)

    return result
  } catch (err) {
    console.error('Sync error:', err.message)
    return []
  }
}

module.exports = downloadAndParse
