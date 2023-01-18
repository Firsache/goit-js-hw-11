export const renderGallery = function (arr) {
    return arr.map( picture => {
    const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = picture;
    
        return `<div class="photo-card">
            <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" class="picture-card"/></a>
            <div class="info">
                <p class="info-item">
                <b>${likes}</b>
                </p>
                <p class="info-item">
                <b>${views}</b>
                </p>
                <p class="info-item">
                <b>${comments}</b>
                </p>
                <p class="info-item">
                <b>${downloads}</b>
                </p>
            </div>
        </div>`
        }).join('')
}