import { useEffect, useState } from 'react'

export default function useAuctionData() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/auctions/all')
        const json = await res.json()
        setData(json.results || [])
      } catch (err) {
        console.error('Fetch error:', err)
        setError(err.message || 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}
