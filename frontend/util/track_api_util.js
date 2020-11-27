export const fetchTracks = () => {
  return $.ajax({
    method: "GET",
    url: "/api/tracks"
  })
}

export const fetchTrack = trackId => {
  return $.ajax({
    method: "GET",
    url: `/api/tracks/${trackId}`
  })
}

export const createTrack = track => {
  return $.ajax({
    method: "POST",
    url: "/api/tracks",
    data: track,
    contentType: false,
    processData: false
  })
}

export const deleteTrack = trackId => {
  return $.ajax({
    method: "DELETE",
    url: `/api/tracks/${trackId}`
  })
}

export const updateTrack = track => {
  return $.ajax({
    method: "PATCH",
    url: `/api/tracks/${track.id}`,
    data: {track}
  })
}