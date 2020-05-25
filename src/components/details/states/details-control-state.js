import { EPISODES_STATE, TAG_BACKGROUND, TAG_DETAILS_CONTROL, TAG_EPISODES, TAG_VIDEO_PLAYER } from '@/constants';

export const createDetailsControlState = base =>
  class DetailsControlState extends base {
    $enter() {
      const tagEpisodes = this.tag(TAG_EPISODES);
      this._currentlyFocused = this.tag(TAG_DETAILS_CONTROL);
      tagEpisodes.setSmooth('alpha', 1);
      tagEpisodes.setSmooth('y', 550);
      this.tag(TAG_BACKGROUND).setSmooth('alpha', 1);
      this._backgroundToVideo.start();
    }

    $exit() {
      const tagEpisodes = this.tag(TAG_EPISODES);
      const tagVideoPlayer = this.tag(TAG_VIDEO_PLAYER);
      this._currentlyFocused = null;
      tagEpisodes.setSmooth('alpha', 0);
      tagEpisodes.setSmooth('y', -400);
      this.tag(TAG_BACKGROUND).setSmooth('alpha', 0);
      this._backgroundToVideo.stop();
      if (tagVideoPlayer.isPlaying()) {
        tagVideoPlayer.stop();
      }
    }

    _handleDown() {
      this._setState(EPISODES_STATE);
    }

    _videoEnded() {
      this._videoToBackground.start();
    }
  };
