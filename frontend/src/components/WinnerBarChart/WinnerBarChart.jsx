import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'
import './WinnerBarChart.css'

export default function WinnerBarChart({ data }) {
  const grouped = {}
  data.forEach((item) => {
    const region = item.region || 'Unknown'
    const tech = item.technology
    if (!grouped[region]) grouped[region] = {}
    grouped[region][tech] = (grouped[region][tech] || 0) + (item.winners || 0)
  })

  const allTechnologies = new Set()
  Object.values(grouped).forEach((regionData) =>
    Object.keys(regionData).forEach((tech) => allTechnologies.add(tech))
  )

  const chartData = Object.entries(grouped).map(([region, techs]) => {
    const row = { region }
    for (const tech of allTechnologies) {
      row[tech] = techs[tech] || 0
    }
    return row
  })

  const filteredTechnologies = [...allTechnologies].filter((tech) =>
    chartData.some((row) => row[tech] > 0)
  )

  const colorMap = [
    '#E63946',
    '#3CB371',
    '#457B9D',
    '#9D4EDD',
    '#0ea5e9',
    '#F4A261',
  ]

  return (
    <div className="winner-chart-container">
      <h2 className="winner-chart-title">🏆 Winners by Region & Technology</h2>

      <div className="winner-legend">
        {filteredTechnologies.map((tech, index) => (
          <span className="legend-item" key={tech}>
            <span
              className="legend-color"
              style={{ backgroundColor: colorMap[index % colorMap.length] }}
            ></span>
            {tech}
          </span>
        ))}
      </div>

      <div className="winner-chart-scroll">
        <div className="winner-chart-inner">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={chartData}>
              <CartesianGrid stroke="#1e293b" vertical={false} />
              <XAxis
                dataKey="region"
                stroke="#94a3b8"
                angle={-40}
                interval={0}
                textAnchor="end"
                height={60}
                tick={{ fontSize: 12 }}
              />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  borderColor: '#38bdf8',
                  borderRadius: '8px',
                  color: '#f1f5f9',
                }}
                labelStyle={{ color: '#38bdf8', fontSize: '13px' }}
                itemStyle={{ color: '#f8fafc', fontSize: '13px' }}
              />
              {filteredTechnologies.map((tech, index) => (
                <Bar
                  key={tech}
                  dataKey={tech}
                  stackId="winners"
                  fill={colorMap[index % colorMap.length]}
                  radius={[2, 2, 0, 0]}
                  activeBar={false}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
