import { Lightning, Utils } from 'wpe-lightning-sdk';

export default class SeasonsItem extends Lightning.Component {
  static _template() {
    return {
      alpha: 0.7,
      Background: {
        rect: true,
        w: 299,
        h: 168,
        color: 0xff000000
      },
      Focus: {
        type: Lightning.components.BorderComponent,
        borderWidth: 0,
        w: 299,
        h: 168
      },
      Image: {},
      Title: {
        y: 175,
        w: 299,
        text: { fontFace: 'Regular', maxLines: 2, fontSize: 24 }
      }
    };
  }

  _focus() {
    this.tag('Focus').setSmooth('borderWidth', 6);
    this.setSmooth('alpha', 1);
  }

  _unfocus() {
    this.tag('Focus').setSmooth('borderWidth', 0);
    this.setSmooth('alpha', 0.7);
  }

  set item(item) {
    this._item = item;
    this.patch({
      Image: {
        texture: {
          resizeMode: {
            type: 'cover',
            w: this._size.w,
            h: this._size.h
          },
          type: Lightning.textures.ImageTexture,
          src: Utils.asset(item.thumbnail)
        }
      },
      Title: {
        text: { text: item.title, wordWrapWidth: this._size.w }
      }
    });
  }

  set size({ w, h }) {
    if (w && h) {
      this._size = { w: w, h: h };
      this.patch({
        Background: {
          w: w,
          h: h
        },
        Focus: {
          w: w,
          h: h
        },
        Image: {
          texture: {
            resizeMode: {
              w: w,
              h: h
            }
          }
        },
        Title: {
          y: this._size.h + 7
        }
      });
    }
  }
}
