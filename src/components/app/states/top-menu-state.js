export const createTopMenuState = base =>
  class TopMenuState extends base {
    $enter() {
      this.tag('TopMenu').patch({
        smooth: { alpha: 1, y: 0 }
      });

      this.tag('Background').setSmooth('alpha', 1);
      this.tag('Details').setSmooth('alpha', 1);
      this.tag('Popular').setSmooth('alpha', 1);

      this._currentlyFocused = this.tag('TopMenu');
    }

    $exit() {
      this.tag('TopMenu').patch({
        smooth: { alpha: 0, y: 100 }
      });

      this.tag('Background').setSmooth('alpha', 0);
      this.tag('Details').setSmooth('alpha', 0);
      this.tag('Popular').setSmooth('alpha', 0);

      this._currentlyFocused = null;
    }

    _handleDown() {
      this._setState('DetailsState');
    }

    _menuSelect({ item }) {
      if (this._hasMethod(item.action)) {
        return this[item.action]();
      }
    }

    tvShows() {
      this._setState('TopMenuState.TvShowsState');
    }

    movies() {
      this._setState('TopMenuState.MoviesState');
    }

    recentlyAdded() {
      this._setState('TopMenuState.RecentlyAddedState');
    }

    static _states() {
      return [
        class TvShowsState extends TopMenuState {},
        class MoviesState extends TopMenuState {},
        class RecentlyAddedState extends TopMenuState {}
      ];
    }
  };
