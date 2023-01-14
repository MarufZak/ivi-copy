import { axios } from 'axios';

const customFetch = axios.create({
    baseUrl: 'https://api.themoviedb.org/3'
})

