import axios from "axios";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_DEFAULT_ENDPOINT,
});

export async function getPopularMovies() {
  const response = await api.get(
    `movie/popular?language=en-GB&page=1&${process.env.EXPO_PUBLIC_TMDB_KEY}`
  );

  return response.data;
}

export async function getPopularShows() {
  const response = await api.get(
    `tv/popular?language=en-GB&page=1&${process.env.EXPO_PUBLIC_TMDB_KEY}`
  );

  return response.data;
}

export async function getMovie(id: string) {
  const response = await api.get(
    `movie/${id}?${process.env.EXPO_PUBLIC_TMDB_KEY}&append_to_response=videos,credits,recommendations,external_ids,reviews,watch/videos`
  );

  return response.data;
}

export async function getShow(id: string) {
  const response = await api.get(
    `tv/${id}?${process.env.EXPO_PUBLIC_TMDB_KEY}&append_to_response=videos,credits,recommendations,external_ids,reviews,watch/videos`
  );

  return response.data;
}

export async function getMovieVideos(id: string) {
  const response = await api.get(`movie/${id}/videos?${process.env.EXPO_PUBLIC_TMDB_KEY}`);

  return response.data;
}

export async function getShowVideos(id: string) {
  const response = await api.get(`tv/${id}/videos?${process.env.EXPO_PUBLIC_TMDB_KEY}`);

  return response.data;
}

export async function getMovieImages(id: string) {
  const response = await api.get(
    `movie/${id}/images?include_image_language=en&${process.env.EXPO_PUBLIC_TMDB_KEY}`
  );

  return response.data;
}

export async function getShowImages(id: string) {
  const response = await api.get(
    `tv/${id}/images?include_image_language=en&${process.env.EXPO_PUBLIC_TMDB_KEY}`
  );

  return response.data;
}

export async function getMovieGenres() {
  const response = await api.get(
    `genre/movie/list?language=en&${process.env.EXPO_PUBLIC_TMDB_KEY}`
  );

  return response.data;
}

export async function getShowGenres() {
  const response = await api.get(`genre/tv/list?language=en&${process.env.EXPO_PUBLIC_TMDB_KEY}`);

  return response.data;
}

export async function getShowEpisodes(id: string) {
  const response = await api.get(`tv/${id}/episode_groups?${process.env.EXPO_PUBLIC_TMDB_KEY}`);

  return response.data;
}
