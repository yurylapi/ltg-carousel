export const createSplashState = base =>
  class SplashState extends base {
    $enter() {
      this.tag('Splash').setSmooth('alpha', 1, { duration: 2 });
      this._api.getVideoData().then(data => {
        this.tag('Splash').startAnimation();
        this._saveApiData(data);
      });
    }

    $exit() {
      this.tag('Splash').setSmooth('alpha', 0);
    }

    animationFinished() {
      this._setState('TopMenuState');
    }
  };
