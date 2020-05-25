import { Lightning } from 'wpe-lightning-sdk';

export default class OverviewGenresItem extends Lightning.Component {
  static _template() {
    return {
      text: {
        text: '',
        color: 0xffffffff,
        fontFace: 'Regular',
        fontSize: 24,
        lineHeight: 30,
        highlight: true,
        highlightHeight: 1,
        highlightColor: 0xffffffff,
        highlightOffset: 31
      }
    };
  }

  set genre(genre) {
    this.text.text = genre;
  }
}
