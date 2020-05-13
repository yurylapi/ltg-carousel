import { Lightning, Utils, Locale } from 'wpe-lightning-sdk';
import { Main, Splash, VideoPlayer } from '../index';

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
        alpha: 0,
        signals: { videoEnded: 'ready', mainFocus: true }
      },
      Main: {
        type: Main,
        alpha: 0,
        signals: { videoFocus: true }
      }
    };
  }

  _setup() {
    this._setState('SplashState');
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
          this.tag('VideoPlayer').setSmooth('alpha', 1);
          this.tag('VideoPlayer').play('http://video.metrological.com/loop.mp4', true);
        }

        $exit() {
          this.tag('Main').patch({
            smooth: { alpha: 0, y: 100 }
          });

          this.tag('VideoPlayer').setSmooth('alpha', 0);
          this.tag('VideoPlayer').stop();
        }

        videoFocus() {
          this._setState('VideoState');
        }

        /**
         * Tell Lightning which component is the active component
         * and should handle the remote control events.
         * @returns {*|never}
         * @private
         */
        _getFocused() {
          return this.tag('Main');
        }
      },
      class VideoState extends this {
        mainFocus() {
          this._setState('MainState');
        }

        ready() {
          console.log('ready signal');
        }

        _getFocused() {
          return this.tag('VideoPlayer');
        }
      }
    ];
  }
}
