import { Lightning, Utils } from 'wpe-lightning-sdk';
import DetailsControls from './details.controls';
import { CastItem, List, Overview, PopularItem, VideoPlayer } from '@/components';
import {
  DETAILS_CONTROL_STATE,
  TAG_BACKGROUND,
  TAG_DETAILS_INFO,
  TAG_EPISODES,
  TAG_OVERVIEW,
  TAG_POPULAR,
  TAG_VIDEO_PLAYER
} from '@/constants';
import DetailsInfo from '@/components/details/details.info';
import {
  createDetailsControlState,
  createEpisodesState,
  createOverviewState,
  createPopularState
} from '@/components/details/states';

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
        y: 580,
        x: 100,
        type: List
      },
      Overview: {
        x: 100,
        y: 2000,
        type: Overview,
        alpha: 0
      },
      Popular: {
        y: 2000,
        x: 100,
        type: List,
        alpha: 0
      }
    };
  }

  _setup() {
    this._currentlyFocused = null;
    this._registerAnimations();
  }

  _firstEnable() {
    this._setState(DETAILS_CONTROL_STATE);
  }

  _getFocused() {
    return this._currentlyFocused;
  }

  /**
   * @param {{
   *  id: Number,
   *  background: String,
   *  intro: String
   * }} item
   */
  $onItemFocus({ item }) {
    const tagVideoPlayer = this.tag(TAG_VIDEO_PLAYER);
    if (tagVideoPlayer.isPlaying()) {
      tagVideoPlayer.stop();
    }
    this._backgroundToVideo.stop();
    this._updateBackground(item.background);
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
    this._backgroundToVideoListener();
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
  _backgroundToVideoListener() {
    this._backgroundToVideo.on('finish', () => {
      this._playVideo();
    });
  }

  /**
   * Run Video Player with active video
   *
   * @private
   */
  _playVideo() {
    this.tag(TAG_VIDEO_PLAYER).play(this.activeVideo, false, true);
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
    this.tag(TAG_EPISODES).patch({
      label: episodes.label,
      itemSize: { w: episodes.itemWidth, h: episodes.itemHeight },
      items: episodes.items,
      constructItem: CastItem
    });
  }

  /**
   * @param {{ label: String, items: Array, itemWidth: Number, itemHeight: Number }} cast
   * @param {String} path
   * @param {String} info
   * @param {String[]} genres
   * @private
   */
  _populateOverview(cast, path, info, genres) {
    this.tag(TAG_OVERVIEW).overviewData = { cast, path, info, genres };
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
   * @param {String[]} genres
   * @private
   */
  _updateDetails({ path, cast, year, info, rating, pgRating, imageTitle, intro, genres }) {
    this.tag(TAG_DETAILS_INFO).info = { year, rating, pgRating, imageTitle };
    this._populateOverview(cast, path, info, genres);
    this._populatePopulars();
    this.activeVideo = intro;
    this._updateBackground(`${path}/backdrop.jpg`);
  }

  _populatePopulars() {
    const popularData = this.popularData;
    this.tag(TAG_POPULAR).patch({
      constructItem: PopularItem,
      label: popularData.label,
      itemSize: popularData.sizes,
      items: this.popularItems
    });
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
   *  intro: String,
   *  genres: String[]
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

  /**
   * @param {String} video
   */
  set activeVideo(video) {
    this._activeVideo = video;
  }

  /**
   * @returns {String}
   */
  get activeVideo() {
    return this._activeVideo;
  }

  /**
   * @param {{ label: String, sizes: Number[] }} popularData
   */
  set popularData(popularData) {
    this._popularData = popularData;
  }

  /**
   * @returns {{ label: String, sizes: Number[] }}
   */
  get popularData() {
    return this._popularData;
  }

  static _states() {
    return [
      createDetailsControlState(this),
      createEpisodesState(this),
      createOverviewState(this),
      createPopularState(this)
    ];
  }
}
