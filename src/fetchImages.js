'use strict';

import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '32927001-bdf8cd2697946056c57f9b5f5';

const params = new URLSearchParams{
    // q: null,
    image_type: photo,
    orientation: horizontal,
    safesearch: true,
    per_page: 40
}

// constructor() {
//     this.page = 1;
//     this.query = null;
//   }

export default function fetchImages() { }