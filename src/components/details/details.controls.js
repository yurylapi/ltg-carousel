import { Lightning, Locale } from 'wpe-lightning-sdk';
import { Button } from '@/components';

export default class DetailsControls extends Lightning.Component {
  static _template() {
    return {
      LeftButton: { color: 0xfff21502, type: Button, buttonText: Locale.tr.playButton },
      RightButton: { color: 0xfff21502, x: 200, type: Button, buttonText: `+ ${Locale.tr.myListButton}` }
    };
  }

  _init() {
    this.index = 0;
  }

  _getFocused() {
    return this.children[this.index];
  }

  _handleLeft() {
    if (this.index > 0) {
      this.index--;
    }
  }

  _handleRight() {
    if (this.index < this.children.length - 1) {
      this.index++;
    }
  }
}
