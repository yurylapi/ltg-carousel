import { Lightning, Utils } from 'wpe-lightning-sdk';
import DetailsControls from './details.controls';
import { Cast, List, Slider, VideoPlayer } from '@/components';
import {TAG_BACKGROUND, TAG_DETAILS, TAG_VIDEO_PLAYER} from '@/constants';
import DetailsInfo from '@/components/details/details.info';

export default class Details extends Lightning.Component {
  static _template() {
    return {
      Background: {
        rect: true,
        w: 1920,
        h: 1080,
        alpha: 0,
        src: Utils.asset('images/ui/background.png')
      },
      VideoPlayer: {
        type: VideoPlayer,
        alpha: 0,
        signals: { videoEnded: '_videoEnded' }
      },
      ControlSection: {
        y: 150,
        x: 100,
        DetailsInfo: {
          type: DetailsInfo
        },
        DetailsControls: {
          y: 280,
          type: DetailsControls
        }
      },
      Episodes: {
        alpha: 0,
        y: 580,
        x: 100,
        type: List
      },
      Overview: {
        x: 100,
        Description: {},
        Cast: {
          type: Cast
        }
      },
      Popular: {
        y: 580,
        x: 100,
        type: Slider,
        alpha: 0
      }
    };
  }

  _setup() {
    this._currentlyFocused = null;
  }

  _init() {
    this._setState('DetailsControlState');
  }

  _getFocused() {
    return this._currentlyFocused;
  }

  $onEpisodeItemFocus({ item }) {
    // this._updateVideo(item.intro);
    this._updateBackground(item.path);
  }

  /**
   * @param {String} path
   * @param {Object} cast
   * @param {String} year
   * @param {String} info
   * @param {Number} rating
   * @param {String} pgRating
   * @param {String} imageTitle
   * @param {String} intro
   * @private
   */
  _updateDetails({ path, cast, year, info, rating, pgRating, imageTitle, intro }) {
    this.tag('DetailsInfo').info = { year, rating, pgRating, imageTitle };
    this._populateCast(cast, path);
    // this._updateVideo(intro);
    this._updateBackground(`${path}/backdrop.jpg`);
  }

  // _updateVideo(intro) {
  //   this.tag('VideoPlayer').play(intro);
  // }

  _updateBackground(src) {
    this.tag(TAG_BACKGROUND).src = Utils.asset(src);
  }

  /**
   * @type {Object} episodes
   * @property {String} label
   * @property {Array} items
   * @property {Number} itemWidth
   * @property {Number} itemHeight
   * @private
   */
  _updateEpisodes(episodes) {
    this.tag('Episodes').patch({
      label: episodes.label,
      itemSize: { w: episodes.itemWidth, h: episodes.itemHeight },
      items: episodes.items
    });
  }

  _populateCast(cast, path) {
    this.tag('Cast').patch({
      label: cast.label,
      itemSize: { w: cast.itemWidth, h: cast.itemHeight },
      path,
      items: cast.items
    });
  }

  // setters/getters
  set activeItem(item) {
    this._activeItem = item;
    this._updateDetails(item);
  }

  get activeItem() {
    return this._activeItem;
  }

  set popularItems(popularItems) {
    this._popularItems = popularItems;
  }

  get popularItems() {
    return this._popularItems;
  }

  /**
   * @type {Object} episodes
   * @property {String} label
   * @property {Array} items
   * @property {Number} itemWidth
   * @property {Number} itemHeight
   */
  set episodes(episodes) {
    this._episodes = episodes;
    this._updateEpisodes(episodes);
  }

  /**
   * @return {{ items: Array, label: String, itemWidth: Number, itemHeight: Number }}
   */
  get episodes() {
    return this._episodes;
  }
  // setters/getters

  static _states() {
    return [
      class DetailsControlState extends this {
        $enter() {
          this._currentlyFocused = this.tag('DetailsControls');
          this.tag('Episodes').setSmooth('alpha', 1);
          this.tag(TAG_BACKGROUND).setSmooth('alpha', 1);
        }

        $exit() {
          this._currentlyFocused = null;
          this.tag('Episodes').setSmooth('alpha', 0);
          this.tag(TAG_BACKGROUND).setSmooth('alpha', 0);
        }

        _handleDown() {
          this._setState('EpisodesState');
        }

        _videoEnded() {
          this.tag(TAG_BACKGROUND).setSmooth('alpha', 1);
        }
      },
      class EpisodesState extends this {
        $enter() {
          const tag = this.tag('Episodes');
          this._currentlyFocused = tag;
          tag.setSmooth('alpha', 1);
          this.tag(TAG_BACKGROUND).setSmooth('alpha', 1);
        }

        $exit() {
          this._currentlyFocused = null;
          this.tag('Episodes').setSmooth('alpha', 0);
        }

        _handleUp() {
          this._setState('DetailsControlState');
        }

        _handleDown() {
          this._setState('OverviewState');
        }
      },
      class OverviewState extends this {
        $enter() {
          const tag = this.tag('Overview');
          this._currentlyFocused = this.tag('Cast');
          tag.setSmooth('alpha', 1);
        }

        $exit() {
          this._currentlyFocused = null;
          this.tag('Overview').setSmooth('alpha', 0);
        }

        _handleUp() {
          this._setState('EpisodesState');
        }

        _handleDown() {
          this._setState('PopularState');
        }
      },
      class PopularState extends this {
        $enter() {
          const tag = this.tag('Popular');
          this._currentlyFocused = tag;
          tag.setSmooth('alpha', 1);
        }

        $exit() {
          this._currentlyFocused = null;
          this.tag('Popular').setSmooth('alpha', 0);
        }

        _handleUp() {
          this._setState('OverviewState');
        }
      }
    ];
  }
}
