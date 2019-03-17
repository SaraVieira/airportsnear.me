import React from 'react'
import ReactCountryFlag from 'react-country-flag'
import { Subtitle, Text } from '../Elements'

export default ({ airport }) => (
  <>
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
        {airport.municipality} -{' '}
        <ReactCountryFlag code={airport.iso_country} svg />
      </Text>
    </div>
    <div>
      <Subtitle>Distance</Subtitle>
      <Text>{(airport._rankingInfo.geoDistance / 1000).toFixed(1)}km</Text>
    </div>
  </>
)
