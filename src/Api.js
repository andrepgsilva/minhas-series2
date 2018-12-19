import axios from 'axios';
import cfg from './config.js';

const api = axios.create({
    'baseURL': cfg.baseURL
});

export const loadGenres = () => api.get('genres');
export const saveSeries = (series) => api.post('series', series);
export const updateSeries = (series) => api.put(`series/${series.id}`, series);
export const loadWatchedSeries = () => api.get('series/?status=watched');
export const loadSeriesByGenre = (genre) => api.get('series?genre=' + genre);
export const deleteSeries = (id) => api.delete(`series/${id}`);
export const loadSeriesById = (id) => api.get(`series/${id}`);

const apis = {
    loadGenres,
    saveSeries,
    loadWatchedSeries,
    loadSeriesByGenre,
    deleteSeries,
    loadSeriesById,
    updateSeries
};

export default apis;