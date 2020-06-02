import { OVERVIEW_STATE, TAG_BACKGROUND, TAG_OVERVIEW, TAG_POPULAR } from '@/constants';

export const createPopularState = base =>
  class PopularState extends base {
    $enter() {
      this._showBackground();
      this._showOverview();
      this._showPopular();
      this._currentlyFocused = this.tag(TAG_POPULAR);
    }

    _showBackground() {
      this.tag(TAG_BACKGROUND).setSmooth('alpha', 1);
    }

    _showOverview() {
      const tag = this.tag(TAG_OVERVIEW);
      tag.setSmooth('alpha', 1);
      tag.setSmooth('y', 150);
    }

    _showPopular() {
      const tag = this.tag(TAG_POPULAR);
      tag.setSmooth('alpha', 1);
      tag.setSmooth('y', 600);
    }

    $exit() {
      this._currentlyFocused = null;
      this._hideOverview();
      this._hidePopular();
      this._hideBackground();
    }

    _hideBackground() {
      this.tag(TAG_BACKGROUND).setSmooth('alpha', 0);
    }

    _hideOverview() {
      const tag = this.tag(TAG_OVERVIEW);
      tag.setSmooth('alpha', 0);
      tag.setSmooth('y', -400);
    }

    _hidePopular() {
      const tag = this.tag(TAG_POPULAR);
      tag.setSmooth('alpha', 0);
      tag.setSmooth('y', 2000);
    }

    _handleUp() {
      this._setState(OVERVIEW_STATE);
    }
  };
