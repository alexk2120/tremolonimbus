export const selectCommentsforTrack = ({ comments, users }, trackId) => {
  if (!comments) return [];
  const trackComments = Object.values(comments).filter(
    ({ track_id }) => track_id == trackId);
  return trackComments.map(comment => {
    comment.user = users[comment.author_id];
    return comment;
  })
}

export const selectLikesforTrack = ({ likes, users }, trackId) => {
  if (!likes) return [];
  const trackLikes = Object.values(likes).filter(
    ({ track_id }) => track_id == trackId);
  return trackLikes.map(like => {
    like.user = users[like.liker_id];
    return like;
  })
}

export const selectTracksforUser = ({ tracks }, userId) => {
  if (!tracks) return [];
  return Object.values(tracks).filter(
    ({ uploader_id }) => uploader_id == userId);
}

export const reduceTracks = (state, tracks) => {
  if (!tracks) return state;
  const newTracks = {};
  Object.values(tracks).forEach(track => {
    if (state[track.id]) track.url = state[track.id].url;
    newTracks[track.id] = track;
  });
  return Object.assign({}, state, newTracks);
}