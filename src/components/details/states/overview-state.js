import { EPISODES_STATE, POPULAR_STATE, TAG_CAST, TAG_OVERVIEW } from '@/constants';

export const createOverviewState = base =>
  class OverviewState extends base {
    $enter() {
      const tag = this.tag(TAG_OVERVIEW);
      this._currentlyFocused = this.tag(TAG_CAST);
      tag.setSmooth('alpha', 1);
      tag.setSmooth('y', 550);
    }

    $exit() {
      const tag = this.tag(TAG_OVERVIEW);
      this._currentlyFocused = null;
      tag.setSmooth('alpha', 0);
      tag.setSmooth('y', 2000);
    }

    _handleUp() {
      this._setState(EPISODES_STATE);
    }

    _handleDown() {
      this._setState(POPULAR_STATE);
    }
  };
