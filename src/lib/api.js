import { Utils } from 'wpe-lightning-sdk';
import { REF_MOVIES, REF_TOP_MENU, REF_TV_SHOWS } from '@/constants';

export default class Api {
  getData() {
    const promises = [this._getMovies(), this._getTvShows(), this._getMenu()];
    return Promise.all(promises);
  }

  async _getMovies() {
    const stream = await fetch(Utils.asset('movies.json'));
    const data = await stream.json();
    return { ref: REF_MOVIES, data };
  }

  async _getTvShows() {
    const stream = await fetch(Utils.asset('series.json'));
    const data = await stream.json();
    return { ref: REF_TV_SHOWS, data };
  }

  async _getMenu() {
    const stream = await fetch(Utils.asset('menu.json'));
    const data = await stream.json();
    return { ref: REF_TOP_MENU, data };
  }
}
