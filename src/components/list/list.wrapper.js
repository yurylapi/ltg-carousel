import { Lightning } from 'wpe-lightning-sdk';

export default class ListWrapper extends Lightning.Component {
  set construct(value) {
    this._construct = value;
  }

  get construct() {
    return this._construct;
  }

  set item(value) {
    this._item = value;
  }

  get item() {
    return this._item;
  }

  get child() {
    return this.children[0];
  }

  set size(v) {
    this._size = v;
  }

  create() {
    this.children = [{ type: this._construct, size: this._size, item: this._item }];

    if (this._notifyOnItemCreation && this.hasFocus()) {
      this._refocus();
    }
  }

  _firstActive() {
    this.create();

    if (!ListWrapper.FIRST_CREATED) {
      this.fireAncestors('$firstItemCreated');
      ListWrapper.FIRST_CREATED = true;
    }
  }

  _getFocused() {
    if (!this.child) {
      this._notifyOnItemCreation = true;
    } else {
      return this.child;
    }
  }
}

ListWrapper.FIRST_CREATED = false;
