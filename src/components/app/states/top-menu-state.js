import { DETAILS_STATE, TAG_BACKGROUND, TAG_DETAILS, TAG_POPULAR, TAG_TOP_MENU, TOP_MENU_STATE } from '@/constants';

export const createTopMenuState = base =>
  class TopMenuState extends base {
    $enter() {
      this.tag(TAG_TOP_MENU).patch({
        smooth: { alpha: 1, y: 0 }
      });

      this.tag(TAG_BACKGROUND).setSmooth('alpha', 1);
      this.tag(TAG_DETAILS).setSmooth('alpha', 1);
      this.tag(TAG_POPULAR).setSmooth('alpha', 1);

      this._currentlyFocused = this.tag('TopMenu');
    }

    $exit() {
      this.tag(TAG_TOP_MENU).patch({
        smooth: { alpha: 0, y: 100 }
      });

      this.tag(TAG_BACKGROUND).setSmooth('alpha', 0);
      this.tag(TAG_DETAILS).setSmooth('alpha', 0);
      this.tag(TAG_POPULAR).setSmooth('alpha', 0);

      this._currentlyFocused = null;
    }

    _handleDown() {
      this._setState(DETAILS_STATE);
    }

    _menuSelect({ item }) {
      if (this._hasMethod(item.action)) {
        return this[item.action]();
      }
    }

    tvShows() {
      this._setState(`${TOP_MENU_STATE}.TvShowsState`);
    }

    movies() {
      this._setState(`${TOP_MENU_STATE}.MoviesState`);
    }

    recentlyAdded() {
      this._setState(`${TOP_MENU_STATE}.RecentlyAddedState`);
    }

    static _states() {
      return [
        class TvShowsState extends TopMenuState {},
        class MoviesState extends TopMenuState {},
        class RecentlyAddedState extends TopMenuState {}
      ];
    }
  };
