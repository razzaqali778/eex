import { useState } from 'react'
import './App.css'
import ei from './assets/energy-icon.png'
import {
  AuctionTable,
  FilterControls,
  SummaryCards,
  VolumeDonutChart,
  VolumeLineChart,
  WinnerBarChart,
} from './components/index'

import useAuctionData from './Hooks/useAuctionData'

export default function App() {
  const { data, loading, error } = useAuctionData()
  const [filters, setFilters] = useState({})

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner" />
        <p>Loading auction data...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container">
        <p> Something went wrong while fetching data.</p>
      </div>
    )
  }

  const filteredData = data.filter((item) => {
    if (filters?.technology && item?.technology !== filters?.technology)
      return false
    if (filters?.auctionMonth && item?.auctionMonth !== filters?.auctionMonth)
      return false
    if (filters?.region && item?.region !== filters?.region) return false
    return true
  })

  return (
    <div className="app-container">
      <h1 className="dashboard-title">
        French Auctions Power Dashboard
        <div className="icon-wrapper">
          <img src={ei} alt="energy-icon" width="24px" height="24px" />
        </div>
      </h1>
      <FilterControls data={data} onFilter={setFilters} />
      <SummaryCards data={filteredData} />
      <div className="dashboard-grid">
        <div className="dashboard-item">
          <VolumeLineChart data={filteredData} />
        </div>
        <div className="dashboard-item">
          <VolumeDonutChart data={filteredData} />
        </div>
        <div className="dashboard-item">
          <AuctionTable data={filteredData} />
        </div>
        <div className="dashboard-item">
          <WinnerBarChart data={filteredData} />
        </div>
      </div>
    </div>
  )
}
