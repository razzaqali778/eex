import { useEffect, useState } from 'react'

const apiUrl = import.meta.env.VITE_API_URL || '/api/auctions/all'
const CACHE_KEY = 'auctionsData'
const CACHE_TIME_KEY = 'auctionsDataTime'
const CACHE_TTL = 60 * 60 * 1000

export default function useAuctionData() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const isCacheFresh = () => {
    const cachedTime = localStorage.getItem(CACHE_TIME_KEY)
    if (!cachedTime) return false
    return Date.now() - parseInt(cachedTime, 10) < CACHE_TTL
  }

  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY)
    if (cached && isCacheFresh()) {
      setData(JSON.parse(cached))
      setLoading(false)
    }

    async function fetchAndCacheData() {
      try {
        const res = await fetch(apiUrl)
        const json = await res.json()
        setData(json.results || [])
        localStorage.setItem(CACHE_KEY, JSON.stringify(json.results || []))
        localStorage.setItem(CACHE_TIME_KEY, Date.now().toString())
      } catch (err) {
        setError(err.message || 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchAndCacheData()
  }, [apiUrl])

  return { data, loading, error }
}
