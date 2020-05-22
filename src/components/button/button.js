import { Lightning } from 'wpe-lightning-sdk';

export default class Button extends Lightning.Component {
  static _template() {
    return {
      texture: Lightning.Tools.getRoundRect(200, 70, 4),
      Label: {
        w: 200,
        y: 18,
        color: 0xffffffff,
        text: { fontSize: 24, fontFace: 'Regular', fontStyle: 'bold', textAlign: 'center' }
      }
    };
  }

  set action(action) {
    this._action = action;
  }

  get action() {
    return this._action;
  }

  _init() {
    this.tag('Label').patch({ text: { text: this.buttonText } });
  }

  _focus() {
    this.patch({ smooth: { alpha: 1, scale: 1.2 } });
  }

  _unfocus() {
    this.patch({ smooth: { alpha: 1, scale: 1.0 } });
  }
}
