import './SummaryCards.css'
const format = (n) => n?.toLocaleString()

export default function SummaryCards({ data }) {
  const totalVolume = data?.reduce(
    (sum, d) => sum + (d.volumeAuctioned || 0),
    0
  )
  const totalWinners = data?.reduce((sum, d) => sum + (d.winners || 0), 0)
  const uniqueTechnologies = new Set(data.map((d) => d.technology)).size

  const cards = [
    {
      label: 'Total Records',
      value: format(data.length),
      background: 'linear-gradient(to right, #7e5bef, #5e60ce)',
    },
    {
      label: 'Total Volume',
      value: format(totalVolume),
      background: 'linear-gradient(to right, #06b6d4, #3b82f6)',
    },
    {
      label: 'Total Winners',
      value: format(totalWinners),
      background: 'linear-gradient(to right, #fb923c, #ec4899)',
    },
    {
      label: 'Unique Technologies',
      value: format(uniqueTechnologies),
      background: 'linear-gradient(to right, #f472b6, #8b5cf6)',
    },
  ]

  return (
    <div className="cards">
      {cards.map((card, i) => (
        <div key={i} className="card" style={{ background: card.background }}>
          <div className="value">{card.value}</div>
          <div className="label">{card.label}</div>
          <svg
            viewBox="0 0 100 10"
            preserveAspectRatio="none"
            width="100%"
            height="20"
          >
            <path
              d="M0,5 C20,0 40,10 60,5 "
              stroke="white"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
      ))}
    </div>
  )
}
