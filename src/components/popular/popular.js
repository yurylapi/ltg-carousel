import { Lightning } from 'wpe-lightning-sdk';
import PopularItem from './popular.item';

export default class Popular extends Lightning.Component {
  static _template() {
    return {
      PopularItems: {
        w: 1920,
        rect: true,
        flex: { direction: 'row', padding: 20, wrap: false, justifyContent: 'space-evenly' },
        children: []
      }
    };
  }

  _init() {
    this._index = 0;
    if (this.tag('PopularItems').children.length) {
      this.signal('background', { src: this.tag('PopularItems').children[0].picture });
    }
  }

  set popularItems(popularItems) {
    this.tag('PopularItems').children = popularItems.map((popularItem, idx) => {
      return {
        type: PopularItem,
        thumbnail: popularItem.thumbnail,
        title: popularItem.title,
        video: popularItem.video,
        picture: popularItem.picture,
        x: idx * 250
      };
    });
  }

  get activeItem() {
    return this.popularItems[this._index];
  }

  get popularItems() {
    return this.tag('PopularItems').children;
  }

  _handleLeft() {
    this._setIndex(Math.max(0, --this._index));
  }

  _handleRight() {
    this._setIndex(Math.min(++this._index, this.popularItems.length - 1));
  }

  _setIndex(idx) {
    this._index = idx;
  }

  _getFocused() {
    return this.activeItem;
  }
}
