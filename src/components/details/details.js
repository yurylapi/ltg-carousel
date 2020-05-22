import { Lightning, Utils } from 'wpe-lightning-sdk';
import DetailsControls from './details.controls';

export default class Details extends Lightning.Component {
  static _template() {
    return {
      ImageTitle: {
        w: 720
      },
      Info: {
        y: 180,
        flex: { direction: 'row', padding: 20, wrap: false, justifyContent: 'space-between' },
        w: 500,
        Rating: {
          flexItem: { margin: 10 },
          text: {
            fontFace: 'Regular',
            fontSize: 24,
            fontStyle: 'bold',
            fontAlign: 'center'
          }
        },
        Year: {
          flexItem: { margin: 10 },
          text: {
            fontFace: 'Regular',
            fontSize: 24,
            fontAlign: 'center'
          }
        },
        PGRating: {
          flexItem: { margin: 10 },
          zIndex: 1,
          text: {
            fontFace: 'Regular',
            fontSize: 24,
            fontAlign: 'center'
          },
          RatingBorder: {
            zIndex: 0,
            x: -8,
            texture: Lightning.Tools.getRoundRect(53, 30, 4, 1, 0xffffffff, true, 0x00ffffff)
          }
        }
      },
      DetailsControls: {
        y: 280,
        type: DetailsControls
      }
    };
  }

  set data(data) {
    this._updateDetails(data);
    this._data = data;
  }

  get data() {
    return this._data;
  }

  $onControlSelected({ control }) {
    if (this._hasMethod(control.action)) {
      return this[control.action]();
    }
  }

  playAction() {
    this._setState('PlayState');
  }

  addMyListAction() {
    this._setState('AddMyListState');
  }

  _updateDetails({ path, cast, year, info, rating, pgRating, imageTitle }) {
    this.patch({
      ImageTitle: {
        texture: {
          resizeMode: {
            type: 'contain',
            w: 720,
            h: 250
          },
          type: Lightning.textures.ImageTexture,
          src: Utils.asset(imageTitle)
        }
      },
      Info: {
        Rating: {
          text: { text: `${rating}% Match` }
        },
        Year: {
          text: { text: year }
        },
        PGRating: {
          text: { text: `${pgRating}+` }
        }
      }
    });
  }

  _getFocused() {
    return this.tag('DetailsControls');
  }

  static _states() {
    return [class PlayState extends this {}, class AddMyListState extends this {}];
  }
}
