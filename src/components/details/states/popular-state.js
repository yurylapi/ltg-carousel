import { OVERVIEW_STATE, TAG_POPULAR } from '@/constants';

export const createPopularState = base =>
  class PopularState extends base {
    $enter() {
      const tag = this.tag(TAG_POPULAR);
      this._currentlyFocused = tag;
      tag.setSmooth('alpha', 1);
    }

    $exit() {
      this._currentlyFocused = null;
      this.tag(TAG_POPULAR).setSmooth('alpha', 0);
    }

    _handleUp() {
      this._setState(OVERVIEW_STATE);
    }
  };
