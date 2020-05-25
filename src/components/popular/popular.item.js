import { Lightning, Utils } from 'wpe-lightning-sdk';

export default class PopularItem extends Lightning.Component {
  static _template() {
    return {
      rect: true,
      color: 0xffffffff,
      w: 370,
      h: 556,
      scale: 1,
      transitions: { scale: { duration: 0.3, delay: 0.05 } }
    };
  }

  set item(v) {
    this._item = v;
    this.patch({
      src: Utils.asset(`${v.path}/posterS.jpg`)
    });
  }

  get item() {
    return this._item;
  }

  _focus() {
    this.setSmooth('scale', 1.1);
  }

  _unfocus() {
    this.setSmooth('scale', 1);
  }
}
