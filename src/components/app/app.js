import { Lightning, Utils, Locale } from 'wpe-lightning-sdk';
import { Splash, VideoPlayer, Details, Popular, TopMenu } from '../index';
import { Api } from '@/lib';
import { POPULAR_ITEMS } from '@/constants';
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
      VideoPlayer: {
        type: VideoPlayer,
        alpha: 0,
        signals: { videoEnded: '_videoEnded' }
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
        title: Utils.asset('images/titles/logo-game-of-thrones-png-7.png'),
        rating: 98,
        year: '2011-2019',
        pgRating: 18,
        alpha: 0
      },
      Popular: {
        x: 120,
        y: 530,
        type: Popular,
        alpha: 0,
        popularItems: POPULAR_ITEMS,
        signals: { popularItemMedia: '_popularItemMedia', popularItemIntro: '_popularItemIntro' }
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
    this._setState('SplashState');
  }

  _init() {
    this._currentlyFocused = null;
  }

  _getFocused() {
    return this._currentlyFocused;
  }

  $onItemSelect({ item }) {
    // slider signal on selected item
  }

  _saveApiData(data) {
    this._data = data;
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
