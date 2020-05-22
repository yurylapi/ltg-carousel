import { DETAILS_STATE, TAG_BACKGROUND, TAG_SPLASH } from '@/constants';

export const createSplashState = base =>
  class SplashState extends base {
    $enter() {
      this.tag(TAG_SPLASH).setSmooth('alpha', 1, { duration: 2 });
      this._api.getVideoData().then(data => {
        this.tag(TAG_SPLASH).startAnimation();
        this.data = data;
        this.activeItem = this.popularTvShows.data[0];
        this._populatePopularItems();
        this._populateDetailsData();
      });
    }

    $exit() {
      this.tag(TAG_SPLASH).setSmooth('alpha', 0);
      this.tag(TAG_BACKGROUND).setSmooth('alpha', 0);
    }

    animationFinished() {
      this._setState(DETAILS_STATE, [{ intro: this.activeItem.intro }]);
    }
  };
