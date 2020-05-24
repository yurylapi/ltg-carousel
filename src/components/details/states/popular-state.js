import { DETAILS_STATE, TAG_BACKGROUND, TAG_DETAILS, TAG_POPULAR, TAG_TOP_MENU } from '@/constants';

export const createPopularState = base =>
  class PopularState extends base {
    $enter() {
      this.tag(TAG_POPULAR).setSmooth('alpha', 1);
      this.tag(TAG_TOP_MENU).patch({
        smooth: { alpha: 1, y: 0 }
      });
      // this.tag('Background').src = Utils.asset(src);
      this.tag(TAG_BACKGROUND).setSmooth('alpha', 1);
      this.tag(TAG_DETAILS).setSmooth('alpha', 1);

      this._currentlyFocused = this.tag(TAG_POPULAR);
    }

    $exit() {
      this.tag(TAG_POPULAR).setSmooth('alpha', 0);
      this.tag(TAG_TOP_MENU).patch({
        smooth: { alpha: 0, y: 100 }
      });
      this.tag(TAG_BACKGROUND).setSmooth('alpha', 0);
      this.tag(TAG_DETAILS).setSmooth('alpha', 0);

      this._currentlyFocused = null;
    }

    _handleUp() {
      this._setState(DETAILS_STATE, [{ activeItem: this._getCurrentlyActiveItem() }]);
    }

    _getCurrentlyActiveItem() {
      return this._currentlyFocused.active.item;
    }
  };
