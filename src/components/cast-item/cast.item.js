import { Lightning, Utils } from 'wpe-lightning-sdk';

export default class CastItem extends Lightning.Component {
  static _template() {
    return {
      flex: { direction: 'row', wrap: false, justifyContent: 'space-evenly' },
      Image: {
        flexItem: {
          alignSelf: 'center'
        }
      },
      CastInfo: {
        flexItem: {
          alignSelf: 'center'
        },
        flex: { direction: 'column', wrap: false },
        Actor: {
          flexItem: {}
        },
        Role: {
          flexItem: {}
        }
      }
    };
  }

  _focus() {
    this.patch({
      smooth: {
        scale: 1.3,
        zIndex: 1
      }
    });
  }

  _unfocus() {
    this.patch({
      smooth: {
        scale: 1,
        zIndex: 0
      }
    });
  }

  /**
   * Populate cast items and all related data
   * @param {{ id: Number, actorName: String, roleName: String, path: String }} item
   */
  set item(item) {
    this._item = item;
    this.patch({
      w: this._size.w,
      h: this._size.h,
      Image: {
        x: this._size.imageW / 2,
        y: this._size.imageH / 2,
        mount: 0.5,
        texture: {
          resizeMode: {
            type: 'contain',
            w: this._size.imageW,
            h: this._size.imageH
          },
          type: Lightning.textures.ImageTexture,
          src: Utils.asset(`${item.path}/cast${item.id}.jpg`)
        },
        shader: {
          type: Lightning.shaders.RoundedRectangle,
          radius: 65
        }
      },
      CastInfo: {
        Actor: {
          text: {
            text: item.actorName,
            fontFace: 'Bold',
            fontSize: 24
          }
        },
        Role: {
          text: {
            text: item.roleName,
            fontFace: 'Regular',
            fontSize: 24
          }
        }
      }
    });
  }

  /**
   * @param {Number} w
   * @param {Number} h
   * @param {Number} imageW
   * @param {Number} imageH
   */
  set size({ w, h, imageW, imageH }) {
    if (w && h && imageW && imageH) {
      this._size = { w, h, imageW, imageH };
      this.patch({
        Image: {
          texture: {
            resizeMode: {
              w: imageW,
              h: imageH
            }
          }
        }
      });
    }
  }
}
