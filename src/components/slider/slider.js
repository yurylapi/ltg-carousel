import SliderItem from './slider.item';
import { Lightning } from 'wpe-lightning-sdk';

export default class Slider extends Lightning.Component {
  static _template() {
    return {
      alpha: 0.5,
      Title: {
        y: 50,
        text: { text: '', fontSize: 24 }
      },
      Items: {
        y: 70,
        x: -15
      }
    };
  }

  set data(v) {
    const { label, data } = v;
    this.patch({
      Title: {
        text: { text: label.toUpperCase() }
      },
      Items: {
        children: data.map((item, idx) => {
          return { type: SliderItem, x: idx * 300, item: item, scale: 0.9 };
        })
      }
    });
  }

  _init() {
    this._index = 0;
  }

  _focus() {
    this.tag('Title').setSmooth('y', 0);
    this.setSmooth('alpha', 1);
    this._setIndex();
  }

  _unfocus() {
    this.tag('Title').setSmooth('y', 50);
    this.setSmooth('alpha', 0.5);
  }

  get items() {
    return this.tag('Items').children;
  }

  get active() {
    return this.items[this._index];
  }

  _handleLeft() {
    if (this._index > 0) {
      this._setIndex(this._index - 1);
    }
  }

  _handleRight() {
    if (this._index < this.items.length - 1) {
      this._setIndex(this._index + 1);
    }
  }

  _handleEnter() {}

  _setIndex(index = this._index) {
    this._index = index;
    this.patch({
      Items: {
        smooth: { x: !index ? 0 : index * -440 }
      }
    });
  }

  _getFocused() {
    this.fireAncestors('$onItemSelect', { item: this.active.item });
    return this.active;
  }

  static _states() {
    return [];
  }
}
