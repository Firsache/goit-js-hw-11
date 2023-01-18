import { Notify } from 'notiflix/build/notiflix-notify-aio';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


import { PixabayAPI } from './pixabay-api';
import { renderGallery } from './createGalleryMarkUp';

const pixabayApi = new PixabayAPI();

const refs = {
    formEl: document.querySelector('#search-form'),
    galleryEl: document.querySelector('.gallery'),
    loadMoreBrn: document.querySelector('.load-more')
}

refs.formEl.addEventListener('submit', onSubmitSearchImages)

async function onSubmitSearchImages(evt) {
    evt.preventDefault();

    pixabayApi.query = evt.target.elements.searchQuery.value.trim();
    pixabayApi.page = 1;

    try {
        const { data } = await pixabayApi.fetchImages();
        if (data.totalHits.length === 0) {
        Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        evt.target.reset();
        refs.galleryEl.innerHTML = '';

        return;
        }

        data.hits()
        .then(response => {
        return renderGallery(response)
        })

        if (data.total_pages > 1) {
            loadMoreBtnEl.classList.remove('is-hidden');
        }
    } catch(err => console.log(err)
}

refs.loadMoreBrn('click', onLoadMoreClick)

async function onLoadMoreClick() {
    pixabayApi.page += 1;

}

// 
// Notify.failure("We're sorry, but you've reached the end of search results.")
// Notify.success("Horray! We found ${} images.")

