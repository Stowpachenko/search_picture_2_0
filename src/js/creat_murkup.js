export default function createMarkup(elements) {
  const markup = elements.map(element => {
    return `
      <div class="photo-card">
        <a href="${element.largeImageURL}">
          <img
            class="photo"
            src="${element.webformatURL}"
            alt="${element.tags}"
            title="${element.tags}"
            loading="lazy"
          />
        </a>

        <div class="info">
          <p class="info-item"><b>Likes</b><span> ${formatNumber(element.likes)}</span></p>
          <p class="info-item"><b>Views</b><span> ${formatNumber(element.views)}</span></p>
          <p class="info-item"><b>Comments</b><span> ${formatNumber(element.comments)}</span></p>
          <p class="info-item"><b>Downloads</b><span> ${formatNumber(element.downloads)}</span></p>
        </div>
      </div>
    `;
  }).join('');

  return markup;
}

function formatNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
