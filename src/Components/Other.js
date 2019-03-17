import React from 'react'
import { Subtitle, Section, Text, Button } from '../Elements'

export default ({ airports, onClick }) => {
  return (
    <div style={{ gridColumn: '1 / 3' }}>
      <Subtitle>Other close airports</Subtitle>
      <Section style={{ padding: 0 }}>
        {airports.map(a => {
          const distance = (a._rankingInfo.geoDistance / 1000).toFixed(1)
          return (
            <Text key={a.id}>
              <Button
                onClick={() =>
                  onClick({
                    latitude: a._geoloc.lat,
                    longitude: a._geoloc.lng
                  })
                }
              >
                {a.name} ({distance}km){' '}
              </Button>
            </Text>
          )
        })}
      </Section>
    </div>
  )
}
