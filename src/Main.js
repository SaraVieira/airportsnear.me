import React, { useEffect, useState } from 'react'
import { useCurrentPosition } from 'react-use-geolocation'
import algoliasearch from 'algoliasearch'
import Autocomplete from 'react-google-autocomplete'
import styled from 'styled-components'
import header from './assets/header.svg'
import wikipedia from './assets/wikipedia.svg'
import google from './assets/google.svg'
import link from './assets/link.svg'
import ReactCountryFlag from 'react-country-flag'

const App = styled.main`
  width: 350px;
  margin: auto;
  margin-top: 50px;
  background: #ffffff;
  box-shadow: -2px 7px 7px rgba(0, 0, 0, 0.1);
`

const H1 = styled.h1`
  font-size: 19.33px;
  color: #ffffff;
  text-shadow: 0 5px 19px rgba(0, 0, 0, 0.27);
  position: absolute;
  margin: 46px 23px;
  max-width: 150px;
  text-transform: uppercase;
`

const Subtitle = styled.span`
  font-size: 13px;
  color: #cdcdcd;
  line-height: 13px;
  margin-bottom: 8px;
  text-transform: uppercase;
  display: block;
`

const Text = styled.p`
  font-size: 16px;
  color: #545454;
  line-height: 24px;

  a {
    color: #545454;
  }
`
const Section = styled.section`
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
`

const List = styled.div`
  display: flex;
  align-items: center;

  a {
    margin-right: 5px;
  }
`

const Maps = styled.img`
  margin-top: -7px;
  display: block;
`

const Link = styled.img`
  height: 13px;
  margin-top: -5px;
  display: block;
`

const client = algoliasearch('A8JDD1DDSB', '06c4bcc6e1b48e0fa133cc97f1180be4')

const index = client.initIndex('all_airports')

const Main = () => {
  const [position] = useCurrentPosition()
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
  useEffect(() => {
    if (position) getData().then(setAirports)
  }, [position, coords])

  const closest = airports[0]
  const other = [airports[1], airports[2]]
  return (
    <App>
      <H1> Your closest airport</H1>
      <Autocomplete
        style={{
          fontSize: '16px',
          position: 'absolute',
          margin: '46px 23px',
          marginTop: '100px',
          padding: '10px 13px',
          background: 'transparent',
          border: '0',
          color: 'white',
          borderBottom: '2px solid white',
          paddingLeft: '0'
        }}
        placeholder="Set Your Location"
        onPlaceSelected={place =>
          setCoords({
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng()
          })
        }
      />
      <img src={header} width="100%" alt="Landscape of city" />

      <Section>
        {airports[0] ? (
          <>
            <div>
              <Subtitle>Name</Subtitle>
              <Text>{airports[0].name}</Text>
            </div>
            <div>
              <Subtitle>Code</Subtitle>
              <Text>{closest.iata_code}</Text>
            </div>
            <div>
              <Subtitle>Location</Subtitle>
              <Text>
                {closest.municipality} -{' '}
                <ReactCountryFlag code={closest.iso_country} svg />
              </Text>
            </div>
            <div>
              <Subtitle>Distance</Subtitle>
              <Text>
                {(closest._rankingInfo.geoDistance / 1000).toFixed(1)}km
              </Text>
            </div>
            <div>
              <Subtitle>Links</Subtitle>
              <Text>
                <List>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={closest.wikipedia_link}
                  >
                    <img width="16" src={wikipedia} alt="Wikipedia logo " />
                  </a>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={closest.home_link}
                  >
                    <Link width="16" src={link} alt="Website" />
                  </a>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://www.google.com/maps/search/?api=1&query=${
                      closest._geoloc.lat
                    },${closest._geoloc.lng}`}
                  >
                    <Maps width="13" src={google} alt="Google logo" />
                  </a>
                </List>
              </Text>
            </div>
            <div style={{ gridColumn: '1 / 3' }}>
              <Subtitle>Other close airports</Subtitle>
              <Section style={{ padding: 0 }}>
                {other.map(a => (
                  <Text key={a.id}>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={a.home_link || a.wikipedia_link}
                    >
                      {a.name} ({(a._rankingInfo.geoDistance / 1000).toFixed(1)}
                      km){' '}
                    </a>
                  </Text>
                ))}
              </Section>
            </div>
          </>
        ) : (
          <Subtitle>Getting your location</Subtitle>
        )}
      </Section>
      {/* {JSON.stringify(airports[0], null, 2)} */}
    </App>
  )
}

export default Main
