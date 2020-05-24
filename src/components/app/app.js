import { Lightning, Utils, Locale } from 'wpe-lightning-sdk';
import { Details, TopMenu, Splash } from '../index';
import { Api } from '@/lib';
import { REF_MOVIES, REF_TOP_MENU, REF_TV_SHOWS, SPLASH_STATE, TAG_POPULAR, TAG_TOP_MENU } from '@/constants';
import { createDetailsState, createErrorState, createTopMenuState, createSplashState } from '@/components/app/states';

export default class App extends Lightning.Component {
  static getFonts() {
    return [
      {
        family: 'Regular',
        url: Utils.asset('fonts/OpenSans-Regular.ttf')
      },
      {
        family: 'Bold',
        url: Utils.asset('fonts/OpenSans-Bold.ttf')
      }
    ];
  }

  static getLocale() {
    Locale.setLanguage('en');
    return Utils.asset('locale/locale.json');
  }

  static _template() {
    return {
      Splash: {
        type: Splash,
        signals: { animationFinished: true },
        alpha: 0
      },
      TopMenu: {
        type: TopMenu,
        alpha: 0,
        zIndex: 1,
        signals: { select: '_menuSelect' }
      },
      Details: {
        type: Details,
        alpha: 0
      }
    };
  }

  _construct() {
    this._api = new Api();
    this._data = null;
    this._activeItem = null;
  }

  _setup() {
    this._setState(SPLASH_STATE);
  }

  _init() {
    this._currentlyFocused = null;
  }

  _getFocused() {
    return this._currentlyFocused;
  }

  // private methods
  _getMovies() {
    return this._data.find(element => element.ref === REF_MOVIES).data;
  }

  _getTvShows() {
    return this._data.find(element => element.ref === REF_TV_SHOWS).data;
  }

  _getPopularTvShows() {
    return this._getTvShows().find(element => element.tag === TAG_POPULAR).data;
  }

  _getSeasonEpisodes(season = 0) {
    let episodes;
    if ('seasons' in this.activeItem) {
      episodes = this.activeItem.seasons[season];
    }
    return episodes;
  }

  /**
   * @private
   */
  _populateTopMenu() {
    this.tag(TAG_TOP_MENU).items = this._getTopMenuItems();
  }

  /**
   * @private
   */
  _getTopMenuItems() {
    return this.data.find(refBlock => refBlock.ref === REF_TOP_MENU).data;
  }

  _populateDetails() {
    this.patch({
      Details: {
        popularItems: this._getPopularTvShows(),
        episodes: this._getSeasonEpisodes(),
        details: this.activeItem
      }
    });
  }
  // private methods

  // setters/getters
  set data(data) {
    this._data = data;
  }

  get data() {
    return this._data;
  }

  set activeItem(item) {
    this._activeItem = item;
    this._populateDetails();
  }

  get activeItem() {
    return this._activeItem;
  }
  // setters/getters

  static _states() {
    return [createSplashState(this), createTopMenuState(this), createDetailsState(this), createErrorState(this)];
  }
}
