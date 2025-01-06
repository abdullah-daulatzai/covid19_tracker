import React, { useEffect, useState } from 'react'
import { Card, CardContent, Typography, Grid } from '@material-ui/core'
import styles from './Card.module.css'
import CountUp from 'react-countup'
import cx from 'classnames'
import { fetchData } from '../../api/index' // Assuming fetchData is in a separate file

const Info = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchCovidData = async () => {
      const result = await fetchData() // Fetch the data
      setData(result) // Store the data in the state
    }

    fetchCovidData() // Call the fetch function when the component mounts
  }, []) // Empty dependency array means this runs only once when the component mounts

  // If data is not yet fetched, show loading message
  if (!data) {
    return <div>Loading...</div>
  }

  const { confirmed, recovered, deaths, lastUpdate } = data

  return (
    <div className={styles.container}>
      <Grid container spacing={3} justify="center">
        {/* Infected Card */}
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.confirm)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Infected
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={confirmed} // Directly using confirmed
                duration={2.5}
                separator=","
              />
            </Typography>
            <Typography color="textSecondary">
              {new Date(lastUpdate).toDateString()}
            </Typography>
            <Typography variant="body2">
              Number of active cases of Covid-19
            </Typography>
          </CardContent>
        </Grid>

        {/* Recoveries Card */}
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.recover)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Recoveries
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={recovered} // Directly using recovered
                duration={2.5}
                separator=","
              />
            </Typography>
            <Typography color="textSecondary">
              {new Date(lastUpdate).toDateString()}
            </Typography>
            <Typography variant="body2">
              Number of recoveries from Covid-19
            </Typography>
          </CardContent>
        </Grid>

        {/* Deaths Card */}
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.death)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Deaths
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={deaths} // Directly using deaths
                duration={2.5}
                separator=","
              />
            </Typography>
            <Typography color="textSecondary">
              {new Date(lastUpdate).toDateString()}
            </Typography>
            <Typography variant="body2">
              Number of Deaths caused by Covid-19
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  )
}

export default Info
