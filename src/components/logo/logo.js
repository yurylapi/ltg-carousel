import { Lightning } from 'wpe-lightning-sdk';

export default class Logo extends Lightning.Component {
  static _template() {
    return {};
  }

  set svgTexture(svg) {
    this.texture = Lightning.Tools.getSvgTexture(svg, this.w, this.h);
  }
}
