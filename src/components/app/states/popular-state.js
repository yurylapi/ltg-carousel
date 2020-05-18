export const createPopularState = base =>
  class PopularState extends base {
    $enter() {
      this.tag('Popular').setSmooth('alpha', 1);
      this.tag('Main').patch({
        smooth: { alpha: 1, y: 0 }
      });
      // this.tag('Background').src = Utils.asset(src);
      this.tag('Background').setSmooth('alpha', 1);
      this.tag('Details').setSmooth('alpha', 1);

      this._currentlyFocused = this.tag('Popular');
    }

    $exit() {
      this.tag('Popular').setSmooth('alpha', 0);
      this.tag('Main').patch({
        smooth: { alpha: 0, y: 100 }
      });
      this.tag('Background').setSmooth('alpha', 0);
      this.tag('Details').setSmooth('alpha', 0);

      this._currentlyFocused = null;
    }

    _handleUp() {
      this._setState('DetailsState');
    }
  };
