import { Lightning, Utils, Locale } from 'wpe-lightning-sdk';
import { TopMenu } from '../index';

export default class App extends Lightning.Component {
  static getFonts() {
    return [
      { family: 'Regular', url: Utils.asset('fonts/Roboto-Regular.ttf') },
      { family: 'nf-icon', url: Utils.asset('fonts/nf-icon-v1-93.ttf') }
    ];
  }

  static getLocale() {
    Locale.setLanguage('en');
    return Utils.asset('locale/locale.json');
  }

  static _template() {
    return {
      Wrapper: {
        w: 1920,
        h: 1080,
        color: 0xfffbb03b,
        src: Utils.asset('images/background.png'),
        flex: { direction: 'row', wrap: true, padding: 20 },
        TopMenu: {
          type: TopMenu
        },
        Logo: {
          x: w => w / 2,
          y: h => h / 2,
          flexItem: {
            alignSelf: 'center'
          },
          src: Utils.asset('images/logo.png')
        },
        Text: {
          mount: 0.5,
          x: w => w / 2,
          y: h => h / 2,
          flexItem: {
            alignSelf: 'center'
          },
          text: {
            text: "Let's start Building!",
            fontFace: 'Regular',
            fontSize: 64,
            textColor: 0xbbffffff
          }
        }
      }
    };
  }
}
