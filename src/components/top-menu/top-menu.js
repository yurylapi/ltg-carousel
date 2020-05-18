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
        w: 90,
        h: 34,
        flexItem: { margin: 10 },
        type: Logo,
        svgTexture: Utils.asset('images/ui/logo.svg')
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

  set items(items) {
    this.tag('Items').children = items.map((item, idx) => {
      return { type: Item, action: item.action, label: item.label, x: idx * 250 };
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
