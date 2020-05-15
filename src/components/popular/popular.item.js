import { Lightning } from 'wpe-lightning-sdk';
import { VideoPlayer } from '@/components';

export default class PopularItem extends Lightning.Component {
  _construct() {
    this.thumbnail = null;
    this.title = null;
    this.video = null;
    this.picture = null;
  }

  static _template() {
    return {
      flexItem: { margin: 10 },
      color: 0xffa8a6a2,
      Title: {
        text: { text: '', fontFace: 'Regular', fontSize: 20, fontStyle: 'bold', textAlign: 'center', w: 250 }
      },
      Thumbnail: {
        src: ''
      },
      Video: {
        type: VideoPlayer,
        alpha: 0
      }
    };
  }

  _focus() {
    this.patch({ smooth: { alpha: 1, scale: 1.2 } });
  }

  _unfocus() {
    this.patch({ smooth: { alpha: 1, scale: 1.0 } });
  }
}
