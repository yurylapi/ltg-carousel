import { Lightning } from 'wpe-lightning-sdk';
import PopularItem from './popular.item';

export default class Popular extends Lightning.Component {
  static _template() {
    return {
      PopularTitle: {
        text: {
          text: 'Popular on T - Mobile',
          fontFace: 'Regular',
          fontSize: 24,
          fontStyle: 'bold'
        }
      },
      PopularItems: {
        w: 1600,
        y: 50,
        x: 20,
        rect: true,
        color: 0x00000000,
        flex: { direction: 'row', wrap: false, justifyContent: 'space-evenly' },
        children: []
      }
    };
  }

  _init() {
    this._index = 0;
  }

  set popularItems(popularItems) {
    this.tag('PopularItems').children = popularItems.map((popularItem, idx) => {
      return {
        type: PopularItem,
        thumbnail: popularItem.thumbnail,
        title: popularItem.title,
        graphicTitle: popularItem.graphicTitle,
        video: popularItem.video,
        picture: popularItem.picture
      };
    });
  }

  get activePopularItem() {
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
    this.signal('popularItemMedia', {
      src: this.activePopularItem.picture,
      graphicTitle: this.activePopularItem.graphicTitle
    });
    // this.signal('popularItemIntro', { video: this.activePopularItem.video });
    return this.activePopularItem;
  }
}
