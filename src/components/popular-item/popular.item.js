import { Lightning, Utils } from 'wpe-lightning-sdk';

export default class PopularItem extends Lightning.Component {
  static _template() {
    return {
      scale: 0.9,
      Focus: {
        type: Lightning.components.BorderComponent,
        borderWidth: 0,
        w: 299,
        h: 168
      },
      Image: {}
    };
  }

  _focus() {
    // const item = this._item;
    // this.fireAncestors('$onItemFocus', { item: { ...item, background: `${item.path}/backdrop.jpg` } });
    this.tag('Focus').setSmooth('borderWidth', 3);
    this.patch({
      smooth: {
        scale: 0.95,
        zIndex: 1
      }
    });
  }

  _unfocus() {
    this.tag('Focus').setSmooth('borderWidth', 0);
    this.patch({
      smooth: {
        scale: 0.9,
        zIndex: 0
      }
    });
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
          src: Utils.asset(`${item.path}/posterS.jpg`)
        }
      }
    });
  }

  set size({ w, h }) {
    if (w && h) {
      this._size = { w: w, h: h };
      this.patch({
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
        }
      });
    }
  }
}
