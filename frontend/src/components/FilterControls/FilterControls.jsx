import { useState, useMemo } from 'react'
import './FilterControls.css'

export default function FilterControls({ data, onFilter }) {
  const [technology, setTechnology] = useState('')
  const [auctionMonth, setAuctionMonth] = useState('')
  const [region, setRegion] = useState('')

  const techOptions = useMemo(() => getSortedUnique(data, 'technology'), [data])
  const monthOptions = useMemo(
    () => getSortedUnique(data, 'auctionMonth'),
    [data]
  )
  const regionOptions = useMemo(() => getSortedUnique(data, 'region'), [data])

  const applyFilters = () => {
    onFilter({ technology, auctionMonth, region })
  }

  return (
    <div className="filter-container">
      <div className="filter-grid">
        <Dropdown
          label="Technology"
          value={technology}
          onChange={setTechnology}
          options={techOptions}
        />
        <Dropdown
          label="Auction Month"
          value={auctionMonth}
          onChange={setAuctionMonth}
          options={monthOptions}
        />
        <Dropdown
          label="Region"
          value={region}
          onChange={setRegion}
          options={regionOptions}
        />
        <div className="filter-button-wrap">
          <button onClick={applyFilters} className="filter-button">
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  )
}

function Dropdown({ label, value, onChange, options }) {
  return (
    <div className="dropdown">
      <label>{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">All</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt || 'Unknown'}
          </option>
        ))}
      </select>
    </div>
  )
}

function getSortedUnique(data, key) {
  const values = new Set()
  data.forEach((item) => {
    if (item[key]) values.add(item[key])
  })

  if (key === 'auctionMonth') {
    return Array.from(values).sort(
      (a, b) => new Date(`${a} 01`) - new Date(`${b} 01`)
    )
  }

  return Array.from(values).sort()
}
