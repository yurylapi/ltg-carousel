import { Lightning, Utils, Locale } from 'wpe-lightning-sdk';
import { Main, Splash, VideoPlayer, Details } from '../index';

export default class App extends Lightning.Component {
  static getFonts() {
    return [
      { family: 'Regular', url: Utils.asset('fonts/Roboto-Regular.ttf') },
      { family: 'nf-icon', url: Utils.asset('fonts/nf-icon-v1-93.ttf') }
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
        /**
         * Define which signals you accept from the splash page
         */
        signals: { loaded: true },
        alpha: 0
      },
      VideoPlayer: {
        type: VideoPlayer,
        alpha: 0
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
        signals: { select: 'menuSelect' }
      },
      Details: {
        type: Details,
        title: Utils.asset('titles/logo-game-of-thrones-png-7.png'),
        rating: 98,
        year: '2011-2019',
        pgRating: 18,
        alpha: 0,
        signals: { videoEnded: 'ended' }
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
      class SplashState extends this {
        $enter() {
          this.tag('Splash').setSmooth('alpha', 1);
        }

        $exit() {
          this.tag('Splash').setSmooth('alpha', 0);
        }

        loaded() {
          this._setState('MainState');
        }
      },
      class MainState extends this {
        $enter() {
          this.tag('Main').patch({
            smooth: { alpha: 1, y: 0 }
          });

          this.tag('Background').setSmooth('alpha', 1);

          this._currentlyFocused = this.tag('Main');
        }

        $exit() {
          this.tag('Main').patch({
            smooth: { alpha: 0, y: 100 }
          });

          this.tag('Background').setSmooth('alpha', 0);

          this._currentlyFocused = null;
        }

        _handleDown() {
          this._setState('DetailsState');
        }

        menuSelect({ item }) {
          if (this._hasMethod(item.action)) {
            return this[item.action]();
          }
        }

        home() {
          this._setState('MainState.HomeState');
        }

        tvShows() {
          this._setState('MainState.TvShowsState');
        }

        movies() {
          this._setState('MainState.MoviesState');
        }

        recentlyAdded() {
          this._setState('MainState.RecentlyAddedState');
        }

        static _states() {
          return [
            class HomeState extends MainState {},
            class TvShowsState extends MainState {},
            class MoviesState extends MainState {},
            class RecentlyAddedState extends MainState {}
          ];
        }
      },
      class DetailsState extends this {
        $enter(args, { video } = { video: 'video/Winter-Is-Coming-Stark-Game-Of-Thrones-Live-Wallpaper.mp4' }) {
          this.tag('VideoPlayer').play(Utils.asset(video), false);
          this.tag('VideoPlayer').setSmooth('alpha', 1);
          this.tag('Details').setSmooth('alpha', 1);
          this._currentlyFocused = this.tag('Details');
        }

        $exit() {
          this.tag('VideoPlayer').setSmooth('alpha', 0);
          this.tag('Details').setSmooth('alpha', 0);
          this.tag('VideoPlayer').stop();
          this._currentlyFocused = null;
        }

        _handleUp() {
          this._setState('MainState');
        }

        ended() {
          this.tag('Background').setSmooth('alpha', 1);
        }
      },
      class Error extends this {}
    ];
  }
}
