import React, { useEffect, useState } from 'react'
import { useCurrentPosition } from 'react-use-geolocation'
import algoliasearch from 'algoliasearch'

import Other from './Components/Other'
import Header from './Components/Header'
import Links from './Components/Links'
import Airport from './Components/Airport'
import { Subtitle, Section, App } from './Elements'

const client = algoliasearch('A8JDD1DDSB', '06c4bcc6e1b48e0fa133cc97f1180be4')

const index = client.initIndex('all_airports')

const Main = () => {
  const [position, error] = useCurrentPosition()
  const [airports, setAirports] = useState([])
  const [coords, setCoords] = useState(null)

  const getData = async () => {
    const coordinates = coords || position.coords
    const { hits } = await index.search({
      aroundLatLng: `${coordinates.latitude}, ${coordinates.longitude}`,
      getRankingInfo: true,
      hitsPerPage: 3,
      facetFilters: ['scheduled_service:yes']
    })

    return hits
  }

  const getDataPerIp = async () => {
    const { hits } = await index.search({
      aroundLatLngViaIP: true,
      getRankingInfo: true,
      hitsPerPage: 3,
      facetFilters: ['scheduled_service:yes']
    })

    return hits
  }

  useEffect(() => {
    if (position) getData().then(setAirports)
    if (error) getDataPerIp().then(setAirports)
  }, [position, coords, error])

  const closest = airports[0]
  const other = [airports[1], airports[2]]
  return (
    <App>
      <Header onSelect={setCoords} />
      <Section>
        {airports[0] ? (
          <>
            <Airport airport={closest} error={error} />
            <Links airport={closest} />
            <Other airports={other} onClick={setCoords} />
          </>
        ) : (
          <Subtitle>Getting your location</Subtitle>
        )}
      </Section>
    </App>
  )
}

export default Main
