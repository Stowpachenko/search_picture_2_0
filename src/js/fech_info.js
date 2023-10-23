import axios from 'axios';

const API_KEY = '29948734-f0f2c73b982a8559ced5d44b7';

export default class Fetch {
  constructor() {
    this.page = 1;
    this._searchedData = '';
  }

  async fetchInfo(element) {
    const searchParams = new URLSearchParams({
      key: API_KEY,
      q: ` ${element}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: 40,
      page: this.page,
    });
    const url = `https://pixabay.com/api/?${searchParams}`;

    try {
      const response = await axios.get(url);

      if (response.status === 404) {
        return [];
      }

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  pageIncrement() {
    this.page += 1;
  }

  pageToStartPosition() {
    this.page = 1;
  }

  get searchedData() {
    return this._searchedData;
  }

  set searchedData(string) {
    this._searchedData = string;
  }
}
