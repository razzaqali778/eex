import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import './VolumeLineChart.css'

export default function VolumeLineChart({ data }) {
  const grouped = {}

  data.forEach((item) => {
    const date = new Date(item.auctionMonth)
    if (isNaN(date)) return

    const year = date.getFullYear()
    if (!grouped[year]) grouped[year] = {}

    const tech = item.technology
    grouped[year][tech] =
      (grouped[year][tech] || 0) + (item.volumeAuctioned || 0)
  })

  const allTechnologies = new Set()
  Object.values(grouped).forEach((yearData) =>
    Object.keys(yearData).forEach((tech) => allTechnologies.add(tech))
  )

  const chartData = Object.entries(grouped).map(([year, volumes]) => {
    const row = { year }
    for (const tech of allTechnologies) {
      row[tech] = volumes[tech] || 0
    }
    return row
  })

  const techList = Array.from(allTechnologies).filter((tech) =>
    chartData.some((row) => row[tech] > 0)
  )

  const colorPalette = [
    '#F6BD60',
    '#3CB371',
    '#457B9D',
    '#9D4EDD',
    '#E63946',
    '#F4A261',
  ]

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
          <XAxis dataKey="year" stroke="#cbd5e1" />
          <YAxis
            stroke="#cbd5e1"
            tickFormatter={(value) =>
              value >= 1_000_000
                ? `${(value / 1_000_000).toFixed(1)}M`
                : `${value.toLocaleString()}`
            }
          />
          <Tooltip
            formatter={(value) =>
              typeof value === 'number' && value > 0
                ? value.toLocaleString()
                : null
            }
            labelStyle={{ color: '#fff' }}
            contentStyle={{
              backgroundColor: '#1e293b',
              borderColor: '#64748b',
              color: 'white',
            }}
          />
          <Legend />
          {techList.map((tech, index) => (
            <Line
              key={tech}
              type="monotone"
              dataKey={tech}
              stroke={colorPalette[index % colorPalette.length]}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
