import { Utils } from 'wpe-lightning-sdk';

export default class Api {
  getVideoData() {
    const promises = [this._getMovies(), this._getTvShows()];
    return Promise.all(promises);
  }

  async _getMovies() {
    const stream = await fetch(Utils.asset('movies.json'));
    const data = await stream.json();
    return { ref: 'Movies', data };
  }

  async _getTvShows() {
    const stream = await fetch(Utils.asset('series.json'));
    const data = await stream.json();
    return { ref: 'TvShows', data };
  }
}
