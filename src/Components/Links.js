import React from 'react'
import wikipedia from '../assets/wikipedia.svg'
import google from '../assets/google.svg'
import link from '../assets/link.svg'
import { Subtitle, Text, List, Link, Maps } from '../Elements'

export default ({ airport }) => (
  <div>
    <Subtitle>Links</Subtitle>
    <Text>
      <List>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={airport.wikipedia_link}
        >
          <img width="24" src={wikipedia} alt="Wikipedia logo " />
        </a>
        <a target="_blank" rel="noopener noreferrer" href={airport.home_link}>
          <Link src={link} alt="Website" />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.google.com/maps/search/?api=1&query=${
            airport._geoloc.lat
          },${airport._geoloc.lng}`}
        >
          <Maps width="21" src={google} alt="Google logo" />
        </a>
      </List>
    </Text>
  </div>
)
