import { Lightning } from 'wpe-lightning-sdk';

export default class TopMenu extends Lightning.Component {
  static _template() {
    return {
      h: 100,
      flexItem: {
        alignSelf: 'center'
      },
      rect: true,
      color: 0x00000000,
      Logo: {
        color: 0x00000000,
        rect: true,
        text: {
          text: 'Something',
          fontSize: 32,
          textColor: 0xffffffff,
          textAlign: 'center'
        }
      }
    };
  }
}
