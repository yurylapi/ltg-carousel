import { Lightning } from 'wpe-lightning-sdk';
import { TopMenu } from '../index';

export default class Main extends Lightning.Component {
  static _template() {
    return {
      TopMenu: {
        type: TopMenu,
        items: [
          { label: 'Home', action: 'home' },
          { label: 'TV Shows', action: 'tvShows' },
          { label: 'Movies', action: 'movies' },
          { label: 'Recently Added', action: 'recentlyAdded' }
        ]
      }
    };
  }

  _getFocused() {
    return this.tag('TopMenu');
  }

  _handleDown() {
    this.signal('videoFocus');
  }

  _handleEnter() {
    this.signal('select', { item: this.tag('TopMenu').activeItem });
  }
}
