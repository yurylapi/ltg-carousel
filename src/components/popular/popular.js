import PopularItem from './popular.item';
import { Lightning } from 'wpe-lightning-sdk';

export default class Popular extends Lightning.Component {
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
          return { type: PopularItem, x: idx * 350, item: item, scale: 0.9 };
        })
      }
    });
  }

  _init() {
    this._index = 0;
  }

  _focus() {
    this.tag('Title').setSmooth('y', 0);
    this._setState('Expanded');
    this._setIndex();
  }

  _unfocus() {
    this.tag('Title').setSmooth('y', 50);
    this._setState('Collapsed');
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

  _setIndex(index = this._index) {
    this._index = index;
    this.patch({
      Items: {
        smooth: { x: !index ? 0 : index * -440 }
      }
    });
  }

  _getFocused() {
    return this.active;
  }

  static _states() {
    return [
      class Expanded extends this {
        $enter() {
          this.items.forEach((item, idx) => {
            item.patch({
              smooth: {
                x: [idx * 440, { duration: 0.3, delay: idx * 0.04 }],
                scale: 1
              }
            });
          });
        }
      },
      class Collapsed extends this {
        $enter() {
          const itemsLength = this.items.length - 1;
          this.items.forEach((item, idx) => {
            if (idx !== itemsLength) {
              item.patch({
                smooth: {
                  x: [idx * 350, { duration: 0.3, delay: idx * 0.03 }],
                  scale: 0.9
                }
              });
            } else {
              item.patch({
                smooth: {
                  scale: 0.9
                }
              });
            }
          });
        }
      }
    ];
  }
}
