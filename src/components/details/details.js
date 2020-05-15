import { Lightning } from 'wpe-lightning-sdk';
import DetailsControls from './details.controls';

export default class Details extends Lightning.Component {
  _construct() {
    this.title = null;
    this.rating = 0;
    this.year = null;
    this.pgRating = 0;
  }

  static _template() {
    return {
      Title: {
        w: 500,
        h: 225,
        x: 100,
        y: 110
      },
      Rating: {
        x: 120,
        y: 380,
        text: {
          fontFace: 'Regular',
          fontSize: 24,
          fontStyle: 'bold'
        }
      },
      Year: {
        x: 270,
        y: 380,
        text: {
          fontFace: 'Regular',
          fontSize: 24
        }
      },
      PGRating: {
        x: 420,
        y: 380,
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
        y: 430,
        type: DetailsControls
      }
    };
  }

  _init() {
    this.tag('Title').patch({ src: this.title });
    this.tag('Rating').patch({ text: { text: `${this.rating}% Match` } });
    this.tag('Year').patch({ text: { text: this.year } });
    this.tag('PGRating').patch({ text: { text: `${this.pgRating}+` } });
  }

  set title(title) {
    this._title = title;
  }

  get title() {
    return this._title;
  }

  _getFocused() {
    return this.tag('DetailsControls');
  }
}
