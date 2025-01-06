import axios from 'axios'

// Define base URL for NovelCOVID API
const url = 'https://disease.sh/v3/covid-19'

// Fetch global or country-specific data
export const fetchData = async (country) => {
  let changeableUrl = `${url}/all`
  if (country) {
    changeableUrl = `${url}/countries/${country}`
  }

  try {
    const {
      data: { cases, recovered, deaths, updated },
    } = await axios.get(changeableUrl)

    // Log the fetched data to see its structure
    console.log('Fetched data:', { cases, recovered, deaths, updated })

    return { confirmed: cases, recovered, deaths, lastUpdate: updated }
  } catch (error) {
    console.error('Error fetching data', error)
  }
}

// Fetch daily data
export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/historical/all?lastdays=all`)

    // Log the entire response data to inspect its structure
    console.log('Fetched daily data:', data)

    const modifiedData = Object.keys(data.cases).map((date) => ({
      confirmed: data.cases[date],
      deaths: data.deaths[date],
      date,
    }))

    // Log the modified data
    console.log('Modified daily data:', modifiedData)

    return modifiedData
  } catch (error) {
    console.error('Error fetching daily data', error)
  }
}

// Fetch countries data
export const fetchCountries = async () => {
  try {
    const { data } = await axios.get(`${url}/countries`)

    // Log the fetched countries data to see its structure
    console.log('Fetched countries data:', data)

    return data.map((country) => country.country)
  } catch (error) {
    console.error('Error fetching countries data', error)
  }
}
