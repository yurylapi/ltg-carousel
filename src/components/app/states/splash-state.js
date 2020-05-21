import { TAG_SPLASH, TOP_MENU_STATE } from '@/constants';

export const createSplashState = base =>
  class SplashState extends base {
    $enter() {
      this.tag(TAG_SPLASH).setSmooth('alpha', 1, { duration: 2 });
      this._api.getVideoData().then(data => {
        this.tag(TAG_SPLASH).startAnimation();
        this.data = data;
        this._populatePopularItems();
      });
    }

    $exit() {
      this.tag(TAG_SPLASH).setSmooth('alpha', 0);
    }

    animationFinished() {
      this._setState(TOP_MENU_STATE);
    }
  };
