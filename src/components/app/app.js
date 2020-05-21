import { Lightning, Utils, Locale } from 'wpe-lightning-sdk';
import { Splash, VideoPlayer, Details, TopMenu, Slider } from '../index';
import { Api } from '@/lib';
import { REF_MOVIES, REF_TV_SHOWS, SPLASH_STATE, TAG_BACKGROUND, TAG_POPULAR } from '@/constants';
import {
  createDetailsState,
  createErrorState,
  createTopMenuState,
  createPopularState,
  createSplashState
} from '@/components/app/states';

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
      Background: {
        rect: true,
        w: 1920,
        h: 1080,
        alpha: 0,
        src: Utils.asset('images/ui/background.png')
      },
      TopMenu: {
        type: TopMenu,
        items: [
          { label: 'TV Shows', action: 'tvShows' },
          { label: 'Movies', action: 'movies' },
          { label: 'Recently Added', action: 'recentlyAdded' }
        ],
        alpha: 0,
        signals: { select: '_menuSelect' }
      },
      Details: {
        type: Details,
        title: Utils.asset('tv/popular/gameofthrones/title.png'),
        rating: 98,
        year: '2011-2019',
        pgRating: 18,
        alpha: 0
      },
      VideoPlayer: {
        type: VideoPlayer,
        alpha: 0,
        signals: { videoEnded: '_videoEnded' }
      },
      Popular: {
        x: 120,
        y: 520,
        type: Slider,
        alpha: 0
      }
    };
  }

  _construct() {
    this._api = new Api();
    this._data = null;
  }

  $api() {
    return this._api;
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

  $onItemSelect({ item }) {
    this.tag(TAG_BACKGROUND).src = Utils.asset(`${item.path}/backdrop.jpg`);
  }

  set data(data) {
    this._data = data;
  }

  get data() {
    return this._data;
  }

  get movies() {
    return this.data.find(element => element.ref === REF_MOVIES).data;
  }

  get tvShows() {
    return this.data.find(element => element.ref === REF_TV_SHOWS).data;
  }

  get popularTvShows() {
    return this.tvShows.find(element => element.tag === TAG_POPULAR);
  }

  _populatePopularItems() {
    this.tag(TAG_POPULAR).patch({
      data: this.popularTvShows
    });
  }

  static _states() {
    return [
      createSplashState(this),
      createTopMenuState(this),
      createDetailsState(this),
      createPopularState(this),
      createErrorState(this)
    ];
  }
}
