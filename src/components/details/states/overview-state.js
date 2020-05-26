import { EPISODES_STATE, POPULAR_STATE, TAG_BACKGROUND, TAG_EPISODES, TAG_OVERVIEW } from '@/constants';

export const createOverviewState = base =>
  class OverviewState extends base {
    $enter() {
      this._showBackground();
      this._showEpisodes();
      this._showOverview();
      this._currentlyFocused = this.tag(TAG_OVERVIEW);
    }

    _showEpisodes() {
      const tagEpisodes = this.tag(TAG_EPISODES);
      tagEpisodes.setSmooth('alpha', 1);
      tagEpisodes.setSmooth('y', 120);
    }

    _showOverview() {
      const tag = this.tag(TAG_OVERVIEW);
      tag.setSmooth('alpha', 1);
      tag.setSmooth('y', 520);
    }

    _showBackground() {
      this.tag(TAG_BACKGROUND).setSmooth('alpha', 1);
    }

    $exit() {
      this._currentlyFocused = null;
      this._hideBackground();
      this._hideEpisodes();
      this._hideOverview();
    }

    _hideBackground() {
      this.tag(TAG_BACKGROUND).setSmooth('alpha', 0);
    }

    _hideOverview() {
      const tag = this.tag(TAG_OVERVIEW);
      tag.setSmooth('alpha', 0);
      tag.setSmooth('y', 2000);
    }

    _hideEpisodes() {
      const tagEpisodes = this.tag(TAG_EPISODES);
      tagEpisodes.setSmooth('alpha', 0);
      tagEpisodes.setSmooth('y', -400);
    }

    _handleUp() {
      this._setState(EPISODES_STATE);
    }

    _handleDown() {
      this._setState(POPULAR_STATE);
    }
  };
