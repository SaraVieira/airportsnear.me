import algoliasearch from 'algoliasearch'

const client = algoliasearch('A8JDD1DDSB', '06c4bcc6e1b48e0fa133cc97f1180be4')

const index = client.initIndex('all_airports')

export const getData = async (coords, position) => {
  const coordinates = coords || position.coords
  const { hits } = await index.search({
    aroundLatLng: `${coordinates.latitude}, ${coordinates.longitude}`,
    getRankingInfo: true,
    hitsPerPage: 3,
    facetFilters: ['scheduled_service:yes']
  })

  return hits
}

export const getDataPerIp = async () => {
  const { hits } = await index.search({
    aroundLatLngViaIP: true,
    getRankingInfo: true,
    hitsPerPage: 3,
    facetFilters: ['scheduled_service:yes']
  })

  return hits
}
