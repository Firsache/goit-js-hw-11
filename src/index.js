import { Notify } from 'notiflix/build/notiflix-notify-aio';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


import { PixabayAPI } from './pixabay-api';
import { renderGallery } from './createGalleryMarkUp';

const pixabayApi = new PixabayAPI();

let simpLightbox = new SimpleLightbox('.photo-card a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
});

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

        if (data.totalHits === 0) {
            Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            evt.target.reset();
            refs.galleryEl.innerHTML = '';

        return;
        } else {
            Notify.success(`Horray! We found ${data.totalHits} images.`);
            refs.galleryEl.innerHTML = '';
            refs.galleryEl.innerHTML = renderGallery(data.hits);
            simpLightbox.refresh();

            const { height: cardHeight } = document
            .querySelector(".gallery")
            .firstElementChild.getBoundingClientRect();

            window.scrollBy({
            top: cardHeight * 2,
            behavior: "smooth",
            });
        }

        if (data.totalHits > 40) {
            refs.loadMoreBrn.hidden = false;
        } else {
            refs.loadMoreBrn.hidden = true;
        }       
        
    } catch(error) {
        console.log(error);
    }
}

refs.loadMoreBrn.addEventListener('click', onLoadMoreClick)

async function onLoadMoreClick(evt) {
    pixabayApi.page += 1;

    const { data } = await pixabayApi.fetchImages();
    refs.galleryEl.innerHTML = '';
    refs.galleryEl.innerHTML = renderGallery(data.hits);
    simpLightbox.refresh();

    if ((pixabayApi.page*pixabayApi.per_page) >= data.totalHits) {
        
        Notify.failure("We're sorry, but you've reached the end of search results.")
        evt.target.hidden = true;
    }
}


