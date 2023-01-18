'use strict';

import axios from 'axios';

export class PixabayAPI {
    // const BASE_URL = 'https://pixabay.com/api/';
    // const API_KEY = '32927001-bdf8cd2697946056c57f9b5f5';

    // constructor() {
    //     this.page = 1;
    //     this.query = null;
    // }

    // async fetchImages(query) {
    //     // if (query) {
    //     //     this.query = query;
    //     // }

    //     const searchParams = {
    //         params: {
    //             query: this.query,
    //             image_type: 'photo',
    //             orientation: 'horizontal',
    //             safesearch: true,
    //             page: this.page,
    //             per_page: 40,
    //             key: API_KEY
    //         }
            
    //     }
    //     const response = await axios.get(`${BASE_URL}`, searchParams)
    //     return response;
    // }

    static BASE_URL = 'https://pixabay.com/api/';
    static API_KEY = '32927001-bdf8cd2697946056c57f9b5f5';

    constructor() {        
        this.page = 1;
        this.query = null;
    }

    async fetchImages(query) {
        if (query) {
            this.query = query;
        }

        const searchParams = {
            params: {
                q: this.query,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                page: this.page,
                per_page: 40,
                key: PixabayAPI.API_KEY
            }
            
        }        
        const response = await axios.get(`${PixabayAPI.BASE_URL}`, searchParams)
        return response;
    }
}

