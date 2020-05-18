import { Utils } from 'wpe-lightning-sdk';

export const createDetailsState = base =>
  class DetailsState extends base {
    $enter(args, { video } = { video: 'video/Winter-Is-Coming-Stark-Game-Of-Thrones-Live-Wallpaper.mp4' }) {
      this.tag('VideoPlayer').play(Utils.asset(video), false);
      this.tag('VideoPlayer').setSmooth('alpha', 1, { duration: 2 });
      this.tag('Details').setSmooth('alpha', 1);
      this.tag('Popular').setSmooth('alpha', 1);
      this._currentlyFocused = this.tag('Details');
    }

    $exit() {
      this.tag('VideoPlayer').setSmooth('alpha', 0, { duration: 2 });
      this.tag('VideoPlayer').stop();
      this.tag('Details').setSmooth('alpha', 0);
      this.tag('Popular').setSmooth('alpha', 0);
      this._currentlyFocused = null;
    }

    _handleUp() {
      this._setState('MainState');
    }

    _handleDown() {
      this._setState('PopularState');
    }

    _videoEnded() {
      this.tag('VideoPlayer').patch({ smooth: { alpha: [0, { duration: 2, delay: 0 }] } });
      this.tag('Background').patch({ smooth: { alpha: [1, { duration: 2, delay: 0 }] } });
    }
  };
