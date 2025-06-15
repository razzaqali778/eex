import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts'
import './VolumeDonutChart.css'

export default function VolumeDonutChart({ data }) {
  const grouped = data.reduce((acc, item) => {
    const tech = item.technology
    if (!acc[tech]) acc[tech] = 0
    acc[tech] += item.volumeAuctioned || 0
    return acc
  }, {})

  const chartData = Object.entries(grouped).map(([technology, volume]) => ({
    name: technology,
    value: volume,
  }))

  const totalVolume = chartData.reduce((sum, d) => sum + d.value, 0)
  const topTech = chartData.slice().sort((a, b) => b.value - a.value)[0]

  const COLORS = [
    '#E63946',
    '#F4A261',
    '#F6BD60',
    '#3CB371',
    '#457B9D',
    '#9D4EDD',
  ]

  return (
    <div className="donut-chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius="65%"
            outerRadius="90%"
            paddingAngle={3}
            startAngle={90}
            endAngle={-270}
          >
            {chartData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [value.toLocaleString(), name]}
            contentStyle={{
              backgroundColor: '#0f172a',
              borderColor: '#14b8a6',
              color: 'white',
            }}
            labelStyle={{ color: '#38bdf8' }}
            itemStyle={{ color: 'white', fontSize: '13px' }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconSize={10}
            wrapperStyle={{
              color: '#94a3b8',
              fontSize: '13px',
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="donut-chart-center">
        <div className="donut-label">Total Volume</div>
        <div className="donut-value">{totalVolume.toLocaleString()}</div>
        <div className="donut-sub">Top: {topTech?.name}</div>
      </div>
    </div>
  )
}
