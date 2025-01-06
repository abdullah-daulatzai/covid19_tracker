import React, { useState, useEffect } from 'react'
import { Line, Bar } from 'react-chartjs-2'

import { fetchDailyData } from '../../api'

import styles from './Chart.module.css'

const Chart = ({ data, country }) => {
  // Default values in case `data` is undefined
  const {
    confirmed = { value: 0 },
    recovered = { value: 0 },
    deaths = { value: 0 },
  } = data || {}
  const [dailyData, setDailyData] = useState([])

  useEffect(() => {
    const fetchMyAPI = async () => {
      const initialDailyData = await fetchDailyData()
      setDailyData(initialDailyData)
    }

    fetchMyAPI()
  }, [])

  const barChart = confirmed.value ? (
    <Bar
      data={{
        labels: ['Infected', 'Recovered', 'Deaths'],
        datasets: [
          {
            label: 'People',
            backgroundColor: [
              'rgba(0, 0, 255, 0.5)',
              'rgba(0, 255, 0, 0.5)',
              'rgba(255, 0, 0, 0.5)',
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` },
      }}
    />
  ) : null

  const lineChart =
    dailyData && dailyData.length > 0 ? (
      <Line
        data={{
          labels: dailyData.map(({ date }) => date),
          datasets: [
            {
              data: dailyData.map((data) => data.confirmed),
              label: 'Infected',
              borderColor: '#3333ff',
              fill: true,
            },
            {
              data: dailyData.map((data) => data.deaths),
              label: 'Deaths',
              borderColor: 'red',
              backgroundColor: 'rgba(255, 0, 0, 0.5)',
              fill: true,
            },
          ],
        }}
      />
    ) : null

  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  )
}

export default Chart
