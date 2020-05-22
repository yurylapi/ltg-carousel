import {
  POPULAR_STATE,
  TAG_BACKGROUND,
  TAG_DETAILS,
  TAG_POPULAR,
  TAG_TOP_MENU,
  TAG_VIDEO_PLAYER,
  TOP_MENU_STATE
} from '@/constants';

export const createDetailsState = base =>
  class DetailsState extends base {
    $enter(args, { activeItem }) {
      this.tag(TAG_BACKGROUND).setSmooth('alpha', 1);
      this._registerAnimations();
      this._playIntro(activeItem.intro);
      this.tag(TAG_TOP_MENU).patch({
        smooth: { alpha: 1, y: 0 }
      });
      this.tag(TAG_DETAILS).setSmooth('alpha', 1);
      this.tag(TAG_POPULAR).setSmooth('alpha', 1);
      this._currentlyFocused = this.tag(TAG_DETAILS);
    }

    $exit() {
      this._backgroundToVideo.stop();
      this.tag(TAG_BACKGROUND).setSmooth('alpha', 0);
      this.tag(TAG_VIDEO_PLAYER).setSmooth('alpha', 0);
      this.tag(TAG_VIDEO_PLAYER).stop();
      this.tag(TAG_TOP_MENU).patch({
        smooth: { alpha: 0, y: 100 }
      });
      this.tag(TAG_DETAILS).setSmooth('alpha', 0);
      this.tag(TAG_POPULAR).setSmooth('alpha', 0);
      this._currentlyFocused = null;
    }

    _registerAnimations() {
      this._backgroundToVideoAnimation();
      this._videoToBackgroundAnimation();
    }

    _handleUp() {
      this._setState(TOP_MENU_STATE);
    }

    _handleDown() {
      this._setState(POPULAR_STATE);
    }

    _backgroundToVideoAnimation() {
      this._backgroundToVideo = this.animation({
        duration: 5,
        repeat: 0,
        stopMethod: 'immediate',
        actions: [
          { t: TAG_BACKGROUND, p: 'alpha', v: { 0: 1, 0.5: 0.5, 1: 0 } },
          { t: TAG_VIDEO_PLAYER, p: 'alpha', v: { 0: 0, 0.5: 0.5, 1: 1 } }
        ]
      });
      this._backgroundToVideo.start();
    }

    _videoToBackgroundAnimation() {
      this._videoToBackground = this.animation({
        duration: 2,
        repeat: 0,
        stopMethod: 'immediate',
        actions: [
          { t: TAG_VIDEO_PLAYER, p: 'alpha', v: { 0: 1, 0.5: 0.5, 1: 0 } },
          { t: TAG_BACKGROUND, p: 'alpha', v: { 0: 0, 0.5: 0.5, 1: 1 } }
        ]
      });
    }

    _playIntro(intro) {
      this._backgroundToVideo.on('finish', () => {
        this.tag(TAG_VIDEO_PLAYER).play(intro, false);
      });
    }

    _videoEnded() {
      this._videoToBackground.start();
    }
  };
