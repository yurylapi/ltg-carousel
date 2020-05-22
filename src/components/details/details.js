import { Lightning } from 'wpe-lightning-sdk';
import DetailsControls from './details.controls';

export default class Details extends Lightning.Component {
  static _template() {
    return {
      Rating: {
        x: 120,
        text: {
          fontFace: 'Regular',
          fontSize: 24,
          fontStyle: 'bold'
        }
      },
      Year: {
        x: 270,
        text: {
          fontFace: 'Regular',
          fontSize: 24
        }
      },
      PGRating: {
        x: 420,
        zIndex: 1,
        text: {
          fontFace: 'Regular',
          fontSize: 24
        },
        RatingBorder: {
          zIndex: 0,
          x: -8,
          texture: Lightning.Tools.getRoundRect(53, 30, 4, 1, 0xffffffff, true, 0x00ffffff)
        }
      },
      DetailsControls: {
        x: 120,
        y: 50,
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

  _updateDetails({ path, cast, title, year, info, rating, pgRating }) {
    this.patch({
      Rating: {
        text: { text: `${rating}% Match` }
      },
      Year: {
        text: { text: year }
      },
      PGRating: {
        text: { text: `${pgRating}+` }
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
