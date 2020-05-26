import {
  EPISODES_STATE,
  TAG_BACKGROUND,
  TAG_CONTROLS_SECTION,
  TAG_DETAILS_CONTROL,
  TAG_EPISODES,
  TAG_VIDEO_PLAYER
} from '@/constants';

export const createDetailsControlState = base =>
  class DetailsControlState extends base {
    $enter() {
      this._showBackground();
      this._showControlSection();
      this._showTagEpisodes();
      this._backgroundToVideo.start();
      this._currentlyFocused = this.tag(TAG_DETAILS_CONTROL);
    }

    _showTagEpisodes() {
      const tagEpisodes = this.tag(TAG_EPISODES);
      tagEpisodes.setSmooth('alpha', 1);
      tagEpisodes.setSmooth('y', 550);
    }

    _showControlSection() {
      const tag = this.tag(TAG_CONTROLS_SECTION);
      tag.setSmooth('alpha', 1);
      tag.setSmooth('y', 150);
    }

    _showBackground() {
      this.tag(TAG_BACKGROUND).setSmooth('alpha', 1);
    }

    $exit() {
      this._currentlyFocused = null;
      this._backgroundToVideo.stop();
      this._stopActiveVideo();
      this._hideBackground();
      this._hideTagEpisodes();
    }

    _hideTagEpisodes() {
      const tagEpisodes = this.tag(TAG_EPISODES);
      tagEpisodes.setSmooth('alpha', 0);
      tagEpisodes.setSmooth('y', -400);
    }

    _hideBackground() {
      this.tag(TAG_BACKGROUND).setSmooth('alpha', 0);
    }

    _stopActiveVideo() {
      const tagVideoPlayer = this.tag(TAG_VIDEO_PLAYER);
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
