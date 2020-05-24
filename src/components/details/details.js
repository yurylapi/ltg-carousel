import { Lightning, Utils } from 'wpe-lightning-sdk';
import DetailsControls from './details.controls';
import { Cast, List, Slider, VideoPlayer } from '@/components';
import { TAG_BACKGROUND, TAG_DETAILS, TAG_VIDEO_PLAYER } from '@/constants';
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
    this._registerAnimations();
  }

  _firstEnable() {
    this._setState('DetailsControlState');
  }

  _getFocused() {
    return this._currentlyFocused;
  }

  /**
   * @param {{
   *  id: Number,
   *  subTitle: String,
   *  thumbnail: String,
   *  episodeBackground: String,
   *  intro: String,
   *  video: String
   * }} item
   */
  $onItemFocus({ item }) {
    this.tag(TAG_VIDEO_PLAYER).stop();
    this._backgroundToVideo.stop();
    this._updateBackground(item.episodeBackground);
    this.activeVideo = item.intro;
    this._backgroundToVideo.start();
  }

  /**
   * Register animations
   *
   * @private
   */
  _registerAnimations() {
    this._backgroundToVideoAnimation();
    this._videoToBackgroundAnimation();
    this._backgroundToVideoSubscriber();
  }

  /**
   * Changing opacity between background and video player
   *
   * @private
   */
  _backgroundToVideoAnimation() {
    this._backgroundToVideo = this.animation({
      duration: 5,
      repeat: 0,
      stopMethod: 'immediate',
      actions: [
        { t: TAG_BACKGROUND, p: 'alpha', v: { 0: 1, 0.5: 0.5, 1: 0 } },
        { t: TAG_VIDEO_PLAYER, p: 'alpha', v: { 0: 0, 0.5: 0.5, 1: 1 } }
      ]
    });
  }

  /**
   * Changing opacity between video player and background
   *
   * @private
   */
  _videoToBackgroundAnimation() {
    this._videoToBackground = this.animation({
      duration: 2,
      repeat: 0,
      stopMethod: 'immediate',
      actions: [
        { t: TAG_VIDEO_PLAYER, p: 'alpha', v: { 0: 1, 0.5: 0.5, 1: 0 } },
        { t: TAG_BACKGROUND, p: 'alpha', v: { 0: 0, 0.5: 0.5, 1: 1 } }
      ]
    });
  }

  /**
   * @private
   */
  _backgroundToVideoSubscriber() {
    this._backgroundToVideo.on('finish', () => {
      this._playVideo();
    });
  }

  _playVideo() {
    this.tag(TAG_VIDEO_PLAYER).play(this.activeVideo);
  }

  /**
   * @param {String} src
   * @private
   */
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
  _populateEpisodes(episodes) {
    this.tag('Episodes').patch({
      label: episodes.label,
      itemSize: { w: episodes.itemWidth, h: episodes.itemHeight },
      items: episodes.items
    });
  }

  /**
   * @param {{ label: String, items: Array, itemWidth: Number, itemHeight: Number }} cast
   * @param {String} path
   * @private
   */
  _populateCast(cast, path) {
    this.tag('Cast').patch({
      label: cast.label,
      itemSize: { w: cast.itemWidth, h: cast.itemHeight },
      path,
      items: cast.items
    });
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
    this.activeVideo = intro;
    this._updateBackground(`${path}/backdrop.jpg`);
  }

  /**
   * @param {{
   *  path: String,
   *  cast: Object,
   *  year: String,
   *  info: String,
   *  rating: Number,
   *  pgRating: String,
   *  imageTitle: String,
   *  intro: String
   * }} item
   */
  set details(item) {
    this._updateDetails(item);
  }

  /**
   * @param {Object[]} popularItems
   */
  set popularItems(popularItems) {
    this._popularItems = popularItems;
  }

  /**
   * @returns {Object[]}
   */
  get popularItems() {
    return this._popularItems;
  }

  /**
   * @param {{ items: Array, label: String, itemWidth: Number, itemHeight: Number }} episodes
   */
  set episodes(episodes) {
    this._episodes = episodes;
    this._populateEpisodes(episodes);
  }

  /**
   * @return {{ items: Array, label: String, itemWidth: Number, itemHeight: Number }}
   */
  get episodes() {
    return this._episodes;
  }

  set activeVideo(video) {
    this._activeVideo = video;
  }

  get activeVideo() {
    return this._activeVideo;
  }

  static _states() {
    return [
      class DetailsControlState extends this {
        $enter() {
          this._currentlyFocused = this.tag('DetailsControls');
          this.tag('Episodes').setSmooth('alpha', 1);
          this.tag(TAG_BACKGROUND).setSmooth('alpha', 1);
          this._backgroundToVideo.start();
        }

        $exit() {
          this._currentlyFocused = null;
          this.tag('Episodes').setSmooth('alpha', 0);
          this.tag(TAG_BACKGROUND).setSmooth('alpha', 0);
          this._backgroundToVideo.stop();
          this.tag(TAG_VIDEO_PLAYER).stop();
        }

        _handleDown() {
          this._setState('EpisodesState');
        }

        _videoEnded() {
          this._videoToBackground.start();
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
