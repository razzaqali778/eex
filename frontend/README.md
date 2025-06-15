# ⚡️ French Auctions Power Dashboard (Frontend)

[![React](https://img.shields.io/badge/React-18+-blue?logo=react)](https://react.dev/)
[![MIT License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![REST API](https://img.shields.io/badge/backend-EEX%20Auction%20API-orange)](../backend/README.md)

A beautiful, interactive dashboard for exploring and visualizing French Power Auction data.  
Built with React, [recharts](https://recharts.org/), and a clean, responsive UI.

---

## ✨ Features

- 📊 **Dynamic Visualizations:** Line, donut, and bar charts for auction volumes and winners.
- 🔎 **Powerful Filtering:** Instantly filter by technology, region, or auction month.
- 🏷 **Summary Cards:** Quick stats on volumes, winners, and technologies.
- 🗃 **Sortable, Infinite Table:** Easy browsing of all auction records.
- 💻 **Fast & Responsive:** Modern React with hooks and optimized rendering.
- 🟢 **API-powered:** Connects to your REST API for live data.

---

### 🖥️ Project Structure

```bash

.
├── public/
├── src/
│   ├── App.jsx
│   ├── index.jsx
│   ├── Hooks/
│   │   └── useAuctionData.js
│   ├── components/
│   │   ├── AuctionTable.jsx
│   │   ├── FilterControls.jsx
│   │   ├── SummaryCards.jsx
│   │   ├── VolumeDonutChart.jsx
│   │   ├── VolumeLineChart.jsx
│   │   ├── WinnerBarChart.jsx
│   ├── App.css
│   ├── index.css
│   └── ...
├── .env.example
├── package.json
└── README.md
```

## Quickstart

### 1. Clone & Install & Start

```bash
git clone https://github.com/razzaqali778/eex.git

cd EEX/frontend

npm install

npm run dev

```
