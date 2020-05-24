import { TAG_DETAILS, TAG_TOP_MENU, TOP_MENU_STATE } from '@/constants';

export const createDetailsState = base =>
  class DetailsState extends base {
    $enter() {
      this.tag(TAG_TOP_MENU).patch({
        smooth: { alpha: 1, y: 0 }
      });
      this.tag(TAG_DETAILS).setSmooth('alpha', 1);
      this._currentlyFocused = this.tag(TAG_DETAILS);
    }

    $exit() {
      this.tag(TAG_TOP_MENU).patch({
        smooth: { alpha: 0, y: 100 }
      });
      this.tag(TAG_DETAILS).setSmooth('alpha', 0);
      this._currentlyFocused = null;
    }

    _handleUp() {
      this._setState(TOP_MENU_STATE);
    }
  };
