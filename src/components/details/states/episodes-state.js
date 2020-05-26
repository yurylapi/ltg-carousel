import {
  DETAILS_CONTROL_STATE,
  OVERVIEW_STATE,
  TAG_BACKGROUND,
  TAG_CONTROLS_SECTION,
  TAG_EPISODES,
  TAG_VIDEO_PLAYER
} from '@/constants';

export const createEpisodesState = base =>
  class EpisodesState extends base {
    $enter() {
      this._showBackground();
      this._showControlSection();
      this._showEpisodes();
      this._currentlyFocused = this.tag(TAG_EPISODES);
    }

    _showControlSection() {
      const tag = this.tag(TAG_CONTROLS_SECTION);
      tag.setSmooth('alpha', 1);
      tag.setSmooth('y', 150);
    }

    _showEpisodes() {
      const tagEpisodes = this.tag(TAG_EPISODES);
      tagEpisodes.setSmooth('alpha', 1);
      tagEpisodes.setSmooth('y', 580);
    }

    _showBackground() {
      this.tag(TAG_BACKGROUND).setSmooth('alpha', 1);
    }

    $exit() {
      this._currentlyFocused = null;
      this._backgroundToVideo.stop();
      this._stopActiveVideo();
      this._hideBackground();
      this._hideControlSection();
      this._hideEpisodes();
    }

    _hideEpisodes() {
      const tagEpisodes = this.tag(TAG_EPISODES);
      tagEpisodes.setSmooth('alpha', 0);
      tagEpisodes.setSmooth('y', -400);
    }

    _hideControlSection() {
      const tag = this.tag(TAG_CONTROLS_SECTION);
      tag.setSmooth('alpha', 0);
      tag.setSmooth('y', -400);
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

    _handleUp() {
      this._setState(DETAILS_CONTROL_STATE);
    }

    _handleDown() {
      this._setState(OVERVIEW_STATE);
    }
  };
