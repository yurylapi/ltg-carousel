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
    $enter(args, { video } = { video: 'video/Winter-Is-Coming-Stark-Game-Of-Thrones-Live-Wallpaper.mp4' }) {
      this.tag(TAG_VIDEO_PLAYER).play(Utils.asset(video), false);
      this.tag(TAG_VIDEO_PLAYER).setSmooth('alpha', 1);
      this.tag(TAG_TOP_MENU).patch({
        smooth: { alpha: 1, y: 0 }
      });
      this.tag(TAG_DETAILS).setSmooth('alpha', 1);
      this.tag(TAG_POPULAR).setSmooth('alpha', 1);
      this._currentlyFocused = this.tag(TAG_DETAILS);
    }

    $exit() {
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

    _videoEnded() {
      this.tag(TAG_VIDEO_PLAYER).patch({ smooth: { alpha: [0, { duration: 2, delay: 0 }] } });
      this.tag(TAG_BACKGROUND).patch({ smooth: { alpha: [1, { duration: 2, delay: 0 }] } });
    }
  };
