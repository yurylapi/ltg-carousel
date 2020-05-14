import { Lightning } from 'wpe-lightning-sdk';

export default class Button extends Lightning.Component {
  static _template() {
    return {
      texture: Lightning.Tools.getRoundRect(150, 40, 4),
      Label: {
        x: 75,
        y: 22,
        mount: 0.5,
        color: 0xffffffff,
        text: { fontSize: 20 }
      }
    };
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
