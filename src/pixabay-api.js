'use strict';

import axios from 'axios';

export class PixabayAPI {
    static BASE_URL = 'https://pixabay.com/api/';
    static API_KEY = '32927001-bdf8cd2697946056c57f9b5f5';

    constructor() {
        this.page = 1;
        this.query = null;
    }

    fetchImages() {
        const searchParams = new URLSearchParams{
            params: {
                query: this.query,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                page: this.page,
                per_page: 40,
                client_id: PixabayAPI.API_KEY
            }
            return axios.get(`${PixabayAPI.BASE_URL}`, searchParams)
        }
    }
}

