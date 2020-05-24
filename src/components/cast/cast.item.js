import { Lightning, Utils } from 'wpe-lightning-sdk';

export default class CastItem extends Lightning.Component {
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
