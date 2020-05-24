import { Lightning } from 'wpe-lightning-sdk';
import { List } from "@/components";
import ListWrapper from "@/components/list/list.wrapper";
import CastItem from "@/components/cast/cast.item";
import ListItem from "@/components/list/list.item";

export default class Cast extends Lightning.Component {
  // set items(value) {
  //   this._itemsData = value;
  //   this._itemSize = this._itemSize ? this._itemSize : { w: 299, h: 169 };
  //   this.tag('Items').children = value.map((item, index) => {
  //     return {
  //       type: ListWrapper,
  //       construct: ListItem,
  //       x: index * (this._itemSize.w + 50),
  //       size: this._itemSize,
  //       item,
  //       path: this._path
  //     };
  //   });
  // }

  set path(path) {
    this._path = path;
  }

  get path() {
    return this._path;
  }
}
