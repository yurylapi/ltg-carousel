import { Lightning } from 'wpe-lightning-sdk';

export default class Item extends Lightning.Component {
  static _template() {
    return {
      color: 0xffa8a6a2,
      text: { text: '', fontFace: 'Regular', fontSize: 20, fontStyle: 'bold', textAlign: 'center', w: 250 }
    };
  }

  set label(label) {
    this.text.text = label;
  }

  set action(action) {
    this._action = action;
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
