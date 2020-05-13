import { Lightning } from 'wpe-lightning-sdk';

export default class Item extends Lightning.Component {
  static _template() {
    return {
      color: 0xffa8a6a2,
      text: { text: '', fontFace: 'Regular', fontSize: 50 }
    };
  }

  set label(v) {
    this.text.text = v;
  }

  set action(v) {
    this._action = v;
  }

  get action() {
    return this._action;
  }

  _focus() {
    this.patch({
      smooth: { color: 0xffffffff }
    });
  }

  _unfocus() {
    this.patch({
      smooth: { color: 0xffa8a6a2 }
    });
  }
}
