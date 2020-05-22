import { Utils } from 'wpe-lightning-sdk';
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
    $enter(args, { intro }) {
      this.tag(TAG_BACKGROUND).setSmooth('alpha', 1);
      this._createAnimations();
      this._playIntro(intro);
      this.tag(TAG_TOP_MENU).patch({
        smooth: { alpha: 1, y: 0 }
      });
      this.tag(TAG_DETAILS).setSmooth('alpha', 1);
      this.tag(TAG_POPULAR).setSmooth('alpha', 1);
      this._currentlyFocused = this.tag(TAG_DETAILS);
    }

    $exit() {
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

    _handleUp() {
      this._setState(TOP_MENU_STATE);
    }

    _handleDown() {
      this._setState(POPULAR_STATE);
    }

    _createAnimations() {
      this._backgroundToVideo = this.animation({
        duration: 2,
        repeat: 0,
        actions: [
          { t: TAG_BACKGROUND, p: 'alpha', v: { 0: 1, 0.5: 0.5, 1: 0 } },
          { t: TAG_VIDEO_PLAYER, p: 'alpha', v: { 0: 0, 0.5: 0.5, 1: 1 } }
        ]
      });
      this._backgroundToVideo.start();
    }

    _playIntro(intro) {
      this._backgroundToVideo.on('finish', () => {
        this.tag(TAG_VIDEO_PLAYER).play(Utils.asset(intro), false);
      });
    }

    _videoEnded() {
      this.tag(TAG_VIDEO_PLAYER).patch({
        smooth: {
          alpha: [0, { duration: 2, delay: 0 }]
        }
      });
      this.tag(TAG_BACKGROUND).patch({
        smooth: {
          src: Utils.asset(`${this.activeItem.path}/backdrop.jpg`),
          alpha: [1, { duration: 2, delay: 0 }]
        }
      });
    }
  };
