export const createSplashState = base =>
  class SplashState extends base {
    $enter() {
      this.tag('Splash').setSmooth('alpha', 1);
    }

    $exit() {
      this.tag('Splash').setSmooth('alpha', 0);
    }

    loaded() {
      this._setState('MainState');
    }
  };
