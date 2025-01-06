import React, { useState, useEffect } from 'react'
import { NativeSelect, FormControl } from '@material-ui/core'
import styles from './Country.module.css'
import { fetchCountries } from '../../api'

const Country = ({ handleCountryChange }) => {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true) // Track loading state

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const fetchedCountries = await fetchCountries()

        // Check if fetchedCountries is a valid array before setting state
        if (Array.isArray(fetchedCountries)) {
          setCountries(fetchedCountries)
        } else {
          console.error(
            'Fetched countries data is not an array',
            fetchedCountries
          )
          setCountries([]) // Fallback to an empty array if not valid
        }
      } catch (error) {
        console.error('Error fetching countries', error)
        setCountries([]) // Fallback to an empty array in case of an error
      } finally {
        setLoading(false) // Done fetching, set loading to false
      }
    }

    fetchAPI()
  }, [])

  // If loading or if countries is not an array, show a loading message or fallback
  if (loading) {
    return <div>Loading countries...</div>
  }

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect
        defaultValue=""
        onChange={(e) => handleCountryChange(e.target.value)}
      >
        <option className={styles.color1} value="global">
          Global
        </option>
        {countries && countries.length > 0 ? (
          countries.map((country, i) => (
            <option key={i} value={country}>
              {country}
            </option>
          ))
        ) : (
          <option value="">No countries available</option> // Fallback message
        )}
      </NativeSelect>
    </FormControl>
  )
}

export default Country
