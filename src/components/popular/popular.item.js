import { Lightning, Utils } from 'wpe-lightning-sdk';

export default class PopularItem extends Lightning.Component {
  _construct() {
    this.thumbnail = null;
    this.title = null;
    this.graphicTitle = null;
    this.video = null;
    this.picture = null;
  }

  static _template() {
    return {
      flexItem: { margin: 20 },
      color: 0xff000000,
      w: 200,
      h: 330,
      Title: {
        alpha: 1,
        text: { text: '', fontFace: 'Regular', fontSize: 20, fontStyle: 'bold', textAlign: 'center', w: 200 }
      },
      Thumbnail: {
        w: 200,
        h: 310,
        alpha: 1,
        src: ''
      }
    };
  }

  _init() {
    this.tag('Title').patch({ text: { text: this.title } });
    this.tag('Thumbnail').patch({ src: Utils.asset(this.thumbnail) });
  }

  _focus() {
    this.patch({ smooth: { alpha: 1, scale: 1.2 } });
  }

  _unfocus() {
    this.patch({ smooth: { alpha: 1, scale: 1.0 } });
  }
}
