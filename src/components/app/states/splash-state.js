import { DETAILS_STATE, TAG_SPLASH } from '@/constants';

export const createSplashState = base =>
  class SplashState extends base {
    $enter() {
      this.tag(TAG_SPLASH).setSmooth('alpha', 1, { duration: 2 });
      this._api.getData().then(data => {
        this.tag(TAG_SPLASH).startAnimation();
        this.apiData = data;
        this.activeItem = this._getPopularTvShows().data.shift();
        this._populateTopMenu();
      });
    }

    $exit() {
      this.tag(TAG_SPLASH).setSmooth('alpha', 0);
    }

    animationFinished() {
      this._setState(DETAILS_STATE);
    }
  };
