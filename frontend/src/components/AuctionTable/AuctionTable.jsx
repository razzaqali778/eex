import { useEffect, useRef, useState } from 'react'
import './AuctionTable.css'

const pageSize = 10

export default function AuctionTable({ data }) {
  const [visibleCount, setVisibleCount] = useState(pageSize)
  const [sortField, setSortField] = useState(null)
  const [sortAsc, setSortAsc] = useState(true)
  const loaderRef = useRef()

  const validData = data.filter(
    (item) =>
      item.technology?.trim() &&
      item.auctionMonth?.trim() &&
      (item.volumeAuctioned || item.price || item.winners)
  )

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc)
    } else {
      setSortField(field)
      setSortAsc(true)
    }
  }

  const renderSortIcon = (field) => {
    if (sortField !== field) return '⇅'
    return sortAsc ? '↑' : '↓'
  }

  const sortedData = [...validData].sort((a, b) => {
    if (!sortField) return 0

    const valA = a[sortField] ?? -Infinity
    const valB = b[sortField] ?? -Infinity

    if (typeof valA === 'number' && typeof valB === 'number') {
      return sortAsc ? valA - valB : valB - valA
    }

    return sortAsc
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA))
  })

  const visibleData = sortedData.slice(0, visibleCount)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + pageSize, validData.length))
        }
      },
      { root: null, rootMargin: '0px', threshold: 1.0 }
    )
    const current = loaderRef.current
    if (current) observer.observe(current)
    return () => current && observer.unobserve(current)
  }, [validData])

  return (
    <div className="auction-table-container">
      <table className="auction-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('technology')}>
              Technology {renderSortIcon('technology')}
            </th>
            <th onClick={() => handleSort('auctionMonth')}>
              Month {renderSortIcon('auctionMonth')}
            </th>
            <th onClick={() => handleSort('volumeAuctioned')}>
              Volume {renderSortIcon('volumeAuctioned')}
            </th>
            <th onClick={() => handleSort('winners')}>
              Winners {renderSortIcon('winners')}
            </th>
            <th onClick={() => handleSort('price')}>
              Price {renderSortIcon('price')}
            </th>
          </tr>
        </thead>
        <tbody>
          {visibleData.map((item, i) => (
            <tr key={i}>
              <td>{item.technology}</td>
              <td>{item.auctionMonth}</td>
              <td>{item.volumeAuctioned?.toLocaleString() ?? '-'}</td>
              <td>{item.winners ?? '-'}</td>
              <td>{item.price ?? '-'}</td>
            </tr>
          ))}
          <tr ref={loaderRef}>
            <td colSpan="5" className="loader">
              Loading more...
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
