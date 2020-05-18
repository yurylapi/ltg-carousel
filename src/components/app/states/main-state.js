export const createMainState = base =>
  class MainState extends base {
    $enter() {
      this.tag('Main').patch({
        smooth: { alpha: 1, y: 0 }
      });

      this.tag('Background').setSmooth('alpha', 1, { duration: 2 });
      this.tag('Details').setSmooth('alpha', 1);

      this._currentlyFocused = this.tag('Main');
    }

    $exit() {
      this.tag('Main').patch({
        smooth: { alpha: 0, y: 100 }
      });

      this.tag('Background').setSmooth('alpha', 0, { duration: 2 });
      this.tag('Details').setSmooth('alpha', 0);

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

    home() {
      this._setState('MainState.HomeState');
    }

    tvShows() {
      this._setState('MainState.TvShowsState');
    }

    movies() {
      this._setState('MainState.MoviesState');
    }

    recentlyAdded() {
      this._setState('MainState.RecentlyAddedState');
    }

    static _states() {
      return [
        class HomeState extends MainState {},
        class TvShowsState extends MainState {},
        class MoviesState extends MainState {},
        class RecentlyAddedState extends MainState {}
      ];
    }
  };
