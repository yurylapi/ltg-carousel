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
        y: 100,
        src: {}
      },
      Rating: {
        y: 150,
        text: {}
      },
      Year: {
        y: 200,
        text: {}
      },
      PGRating: {
        y: 250,
        text: {}
      },
      Controls: {
        type: DetailsControls
      }
    };
  }

  _init() {
    this.tag('Title').patch({ src: this.title });
    this.tag('Rating').patch({ text: { text: `${this.rating}% Match` } });
    this.tag('Year').patch({ text: { text: this.year } });
    this.tag('PGRating').patch({ text: { text: this.pgRating } });
  }

  _getFocused() {
    return this.tag('DetailsControls');
  }
}
