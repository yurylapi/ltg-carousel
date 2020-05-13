import { Lightning } from 'wpe-lightning-sdk';

export default class ProgressBar extends Lightning.Component {
  static _template() {
    return {
      Bar: {
        rect: true,
        color: 0x20ffffff,
        h: 10,
        w: 1500
      },
      Duration: {
        rect: true,
        color: 0xffffffff,
        h: 10
      }
    };
  }

  setProgress(currentTime, duration) {
    this._currentTime = currentTime;
    this._duration = duration;

    const p = currentTime / Math.max(duration, 1);
    this.tag('Duration').setSmooth('w', p * 1500, { timingFunction: 'linear' });
  }
}
