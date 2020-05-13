import { Lightning, Utils } from 'wpe-lightning-sdk';
import Item from './top-menu.item';
import { Logo } from '@/components';

export default class TopMenu extends Lightning.Component {
  static _template() {
    return {
      w: 1920,
      rect: true,
      color: 0x80000000,
      flex: { direction: 'row', padding: 20, wrap: false, justifyContent: 'space-evenly' },
      Logo: {
        w: 55,
        h: 28,
        flexItem: { margin: 10 },
        type: Logo,
        svgTexture: Utils.asset('images/t-mobile-logo.svg')
      },
      Items: {
        flexItem: { margin: 10 },
        w: 1000,
        children: []
      },
      PersonalArea: {
        flexItem: { margin: 10 },
        w: 300
      }
    };
  }

  _init() {
    this._index = 0;
  }

  set items(v) {
    this.tag('Items').children = v.map((el, idx) => {
      return { type: Item, action: el.action, label: el.label, x: idx * 250 };
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
