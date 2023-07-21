import axios from "axios"
const API_key = 'f04280a59593beb5e2ef3728c1336c0e';
export const fetchFilmsWeeklyTrends = async () => {
    const data = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_key}`
    );
    return data.data.results;
}
export const fetchFilmsDetails = async(id) => {
  const data = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_key}`
  );
  return data.data;
}
export const fetchFilmsCasts = async id => {
  const data = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_key}`
  );
  return data.data.cast;
};
export const fetchFilmsReviews = async id => {
  const data = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_key}`
  );
  return data.data.results;
};
export const fetchFilmsByName = async querry => {
  const data = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_key}&query=${querry}`
  );
  return data.data.results;
};