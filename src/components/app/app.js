import { Lightning, Utils, Locale } from 'wpe-lightning-sdk';
import { Main, Splash, VideoPlayer, Details, Popular } from '../index';
import { POPULAR_ITEMS } from '@/constants';
import {
  createDetailsState,
  createErrorState,
  createMainState,
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
        signals: { loaded: true },
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
        src: Utils.asset('images/thumb-1920-932618.jpg')
      },
      Main: {
        type: Main,
        alpha: 0,
        signals: { select: '_menuSelect' }
      },
      Details: {
        type: Details,
        title: Utils.asset('titles/logo-game-of-thrones-png-7.png'),
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

  _setup() {
    this._setState('SplashState');
  }

  _init() {
    this._currentlyFocused = null;
  }

  _getFocused() {
    return this._currentlyFocused;
  }

  static _states() {
    return [
      createSplashState(this),
      createMainState(this),
      createDetailsState(this),
      createPopularState(this),
      createErrorState(this)
    ];
  }
}
