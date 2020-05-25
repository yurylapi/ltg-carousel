import { Lightning, Utils } from 'wpe-lightning-sdk';

export default class ListItem extends Lightning.Component {
  static _template() {
    return {
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
        text: {
          fontFace: 'Regular',
          maxLines: 2,
          fontSize: 30,
          highlight: true,
          paddingLeft: 20,
          paddingRight: 20,
          highlightPaddingLeft: 20,
          highlightPaddingRight: 20
        }
      }
    };
  }

  _focus() {
    this.fireAncestors('$onItemFocus', { item: this._item });
    this.tag('Focus').setSmooth('borderWidth', 6);
    this.patch({
      smooth: {
        scale: 1.3,
        zIndex: 1
      }
    });
  }

  _unfocus() {
    this.tag('Focus').setSmooth('borderWidth', 0);
    this.patch({
      smooth: {
        scale: 1,
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
          src: Utils.asset(item.thumbnail)
        }
      },
      Title: {
        text: { text: item.title }
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
          y: this._size.h - 60
        }
      });
    }
  }
}
