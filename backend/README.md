# 🏦 # Auction Data REST API

[![Node.js](https://img.shields.io/badge/node-%3E%3D16.0.0-green)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/database-MongoDB-green)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A full-featured ETL and REST API server to automate **EEX auction data** ingestion, cleaning, and querying.  
It downloads, extracts, parses, and syncs historical and current auction data from ZIP-compressed Excel files directly into MongoDB, and exposes a robust API for downstream applications.

---

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Sync & Cron Jobs](#sync--cron-jobs)
- [Data Model](#data-model)
- [Developer Notes](#developer-notes)
- [License](#license)

---

## 🚀 Features

- **Automated ETL**: Downloads, unzips, and parses Excel (.xlsx) auction data files from the EEX site.
- **Bulk Database Sync**: Efficient MongoDB upserts, duplicate prevention, and batch operations.
- **REST API**: Query, clear, and sync auction data with robust error handling.
- **Worker Threads**: High-performance bulk data inserts.
- **Cron Job**: Scheduled daily sync/refresh at 08:00 UTC.
- **Extensible**: Modular code structure, easy to customize or extend for other sources.

---

## 📂 Project Structure

```text
.
├── config/
│   └── db.js              # MongoDB connection logic
├── controller/
│   └── auctionController.js
├── models/
│   └── AuctionModel.js    # Mongoose schema/model
├── parser/
│   └── parseExcelFile.js  # XLSX row parsing
├── routes/
│   └── auctionRoutes.js
├── scraper/
│   └── downloadAndParse.js# ZIP/XLSX downloader & parser
├── services/
│   ├── auctionService.js  # Sync/clear/query logic
│   └── saveToMongo.js
├── worker/
│   └── mongoBulkWorker.js # Worker thread for batch inserts
├── data/
│   ├── result.json        # Parsed results
│   ├── zip/               # Downloaded ZIPs
│   └── extracted/         # Unzipped XLSX files
├── app.js                 # Main Express server
├── .env                   # Environment variables
└── README.md
```

### 1. Clone & Install & Start

Install my-project with npm

```bash
git clone https://github.com/razzaqali778/eex.git

cd EEX/backend

npm install

npm start

```
