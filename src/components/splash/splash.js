import { Lightning, Utils } from 'wpe-lightning-sdk';
import { Logo } from '@/components';

export default class Splash extends Lightning.Component {
  static _template() {
    return {
      Background: {
        rect: true,
        w: 1920,
        h: 1080,
        colorTop: 0xff38769f,
        colorBottom: 0xff363358
      },
      Logo: {
        w: 300,
        h: 146,
        type: Logo,
        mount: 0.5,
        x: 960,
        y: 540,
        alpha: 0,
        transitions: { alpha: { duration: 1 }, scale: { duration: 1 } },
        svgTexture: Utils.asset('images/t-mobile-logo.svg')
      }
    };
  }

  _init() {
    this._pulse = this.animation({
      duration: 1,
      repeat: 3,
      actions: [{ t: 'Logo', p: 'rotation', v: { 0: 0, 1: Math.PI * 2 } }]
    });
    this._pulse.start();

    this._pulse.on('finish', () => {
      this.signal('loaded');
    });
  }

  _active() {
    this.patch({
      Logo: {
        smooth: { alpha: 1, scale: 1.2 }
      }
    });
  }
}
