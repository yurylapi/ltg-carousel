import { Lightning, Locale } from 'wpe-lightning-sdk';
import { Button } from '@/components';

export default class DetailsControls extends Lightning.Component {
  static _template() {
    return {
      PlayButton: { color: 0xfff21502, type: Button, action: 'playAction', buttonText: Locale.tr.play_button },
      AddMyListButton: {
        color: 0xfff21502,
        x: 250,
        type: Button,
        action: 'addMyListAction',
        buttonText: `+ ${Locale.tr.my_list_button}`
      }
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

  get activeControl() {
    return this.children[this.index];
  }

  _handleRight() {
    if (this.index < this.children.length - 1) {
      this.index++;
    }
  }

  _handleEnter() {
    this._onControlSelected(this.activeControl);
  }

  _onControlSelected(control) {
    if (this._hasMethod(control.action)) {
      return this[control.action]();
    }
  }

  // actions
  playAction() {
    this._setState('PlayState');
  }

  addMyListAction() {
    this._setState('AddMyListState');
  }
  // actions

  static _states() {
    return [class PlayState extends this {}, class AddMyListState extends this {}];
  }
}
