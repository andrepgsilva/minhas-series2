import axios from 'axios';

const api = axios.create({
    'baseURL': 'http://localhost:4000/'
});

export const loadGenres = () => api.get('genres');
export const saveSeries = (series) => api.post('series', series);
export const updateSeries = (series) => api.put(`series/${series.id}`, series);
export const loadSeriesByGenre = (genre) => api.get('series?genre=' + genre);
export const deleteSeries = (id) => api.delete(`series/${id}`);
export const loadSeriesById = (id) => api.get(`series/${id}`);

const apis = {
    loadGenres,
    saveSeries,
    loadSeriesByGenre,
    deleteSeries,
    loadSeriesById,
    updateSeries
};

export default apis;