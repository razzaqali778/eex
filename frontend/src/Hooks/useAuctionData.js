import { useEffect, useState } from 'react'

const apiUrl = import.meta.env.VITE_API_URL || '/api/auctions/all'
export default function useAuctionData() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(apiUrl)
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

  console.log('data', data)

  return { data, loading, error }
}
