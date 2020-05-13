import { Lightning } from 'wpe-lightning-sdk';
import Item from './top-menu.item';

export default class TopMenu extends Lightning.Component {
  static _template() {
    return {
      w: 1920,
      rect: true,
      color: 0x00000000,
      Items: {
        children: []
      },
      Logo: {},
      PersonalArea: {}
    };
  }

  _init() {
    this._index = 0;
  }

  set items(v) {
    this.tag('Items').children = v.map((el, idx) => {
      return { type: Item, action: el.action, label: el.label, x: idx * 400 };
    });
  }

  get items() {
    return this.tag('Items').children;
  }

  get activeItem() {
    return this.items[this._index];
  }

  _handleLeft() {
    this._setIndex(Math.max(0, --this._index));
  }

  _handleRight() {
    this._setIndex(Math.min(++this._index, this.items.length - 1));
  }

  _setIndex(idx) {
    this._index = idx;
  }

  _getFocused() {
    return this.activeItem;
  }
}
