mapboxgl.accessToken = mapToken
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: campground.geometry.coordinates,
  zoom: 9
})

new mapboxgl.Marker({ color: 'red', draggable: true })
  .setLngLat(campground.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<h3>${campground.title}</h3>
        <p>${campground.location}</p>`
    )
  )
  .addTo(map)

map.addControl(new mapboxgl.NavigationControl())
