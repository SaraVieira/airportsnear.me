import React, { useEffect, useState } from 'react'
import { useCurrentPosition } from 'react-use-geolocation'

import { getData, getDataPerIp } from './utils/alogolia'
import Other from './Components/Other'
import Header from './Components/Header'
import Links from './Components/Links'
import Airport from './Components/Airport'
import { Subtitle, Section, App } from './Elements'

const Main = () => {
  const [position, error] = useCurrentPosition()
  const [airports, setAirports] = useState([])
  const [coords, setCoords] = useState(null)

  useEffect(() => {
    // if user accepts
    if (position) getData(coords, position).then(setAirports)
    // if user says no or there is an issue getting geolocation
    if (error) getDataPerIp().then(setAirports)
  }, [position, coords, error])

  const closest = airports[0]
  return (
    <App>
      <Header onSelect={setCoords} />
      <Section>
        {airports[0] ? (
          <>
            <Airport airport={closest} error={error} />
            <Links airport={closest} />
            <Other airports={[airports[1], airports[2]]} onClick={setCoords} />
          </>
        ) : (
          <Subtitle>Getting your location</Subtitle>
        )}
      </Section>
    </App>
  )
}

export default Main
