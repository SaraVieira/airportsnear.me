import React from 'react'
import ReactCountryFlag from 'react-country-flag'
import { Subtitle, Text } from '../Elements'

export default ({ airport, error }) => (
  <>
    {error ? (
      <Subtitle style={{ gridColumn: '1 / 3', color: '#d58e8e' }}>
        Because there was an error getting your geolocation these results are by
        IP and maybe off mainly if you are using mobile data
      </Subtitle>
    ) : null}
    <div>
      <Subtitle>Name</Subtitle>
      <Text>{airport.name}</Text>
    </div>
    <div>
      <Subtitle>Code</Subtitle>
      <Text>{airport.iata_code}</Text>
    </div>
    <div>
      <Subtitle>Location</Subtitle>
      <Text>
        {airport.municipality && `${airport.municipality} - `}
        <ReactCountryFlag code={airport.iso_country} svg />
      </Text>
    </div>
    <div>
      <Subtitle>Distance</Subtitle>
      <Text>{(airport._rankingInfo.geoDistance / 1000).toFixed(1)}km</Text>
    </div>
  </>
)
