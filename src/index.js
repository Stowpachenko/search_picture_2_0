import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { refs } from './js/refs.js';
import addMurkup from './js/add_murcup.js';
import Fetch from './js/fech_info.js';

const fetchInfo = new Fetch();
const gallerySimpleLightbox = new SimpleLightbox('.gallery a');
const { formEl, inputEl, btnEl, murkupEl } = refs;

formEl.addEventListener('submit', onFormSubmit);
btnEl.addEventListener('click', onButtonEl);
inputEl.addEventListener('input', handleInputChange);

function onFormSubmit(evt) {
  evt.preventDefault();
  cleanMurkup();

  fetchData(fetchInfo.searchedData)
    .then(data => {
      if (!data.data.hits.length) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        Notiflix.Notify.success(`Hooray! We found ${data.data.totalHits} images.`);
        btnEl.classList.remove('is-hidden');
        if (data.data.totalHits <= 40) {
          btnEl.classList.add('is-hidden');
        }

        fetchInfo.pageDicrement();
        addMurkup(murkupEl, data.data.hits);

        const { height: cardHeight } = document
          .querySelector('.gallery a')
          .firstElementChild.getBoundingClientRect();

        window.scrollBy({
          top: cardHeight * 1,
          behavior: 'smooth',
        });
        gallerySimpleLightbox.refresh();
      }
    })
    .catch(err => {
      console.log(err.message);
    });
}

function onButtonEl() {
  fetchData(fetchInfo.searchedData)
    .then(data => {
      btnEl.classList.remove('is-hidden');
      fetchInfo.pageDicrement();
      addMurkup(murkupEl, data.data.hits);

      const { height: cardHeight } = document
        .querySelector('.gallery a')
        .firstElementChild.getBoundingClientRect();
      if (fetchInfo.page - 1 === Math.ceil(data.data.totalHits / 40)) {
        btnEl.classList.add('is-hidden');
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      }

      window.scrollBy({
        top: cardHeight * 1,
        behavior: 'smooth',
      });
      gallerySimpleLightbox.refresh();
    })
    .catch(err => {
      console.log(err);
    });
}

function handleInputChange(evt) {
  fetchInfo.searchedData = evt.target.value;
}

function cleanMurkup() {
  murkupEl.innerHTML = '';
  fetchInfo.pageToStartPosition();
  btnEl.classList.add('is-hidden');
}

async function fetchData(searchedData) {
  try {
    const data = await fetchInfo.fetchInfo(searchedData);
    return data;
  } catch (err) {
    throw err;
  }
}
