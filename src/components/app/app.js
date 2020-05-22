import { Lightning, Utils, Locale } from 'wpe-lightning-sdk';
import { VideoPlayer, Details, TopMenu, Slider, Seasons, Splash } from '../index';
import { Api } from '@/lib';
import {
  REF_MOVIES,
  REF_TV_SHOWS,
  SPLASH_STATE,
  TAG_BACKGROUND,
  TAG_DETAILS,
  TAG_POPULAR,
  TAG_SEASONS
} from '@/constants';
import {
  createDetailsState,
  createErrorState,
  createTopMenuState,
  createPopularState,
  createSplashState
} from '@/components/app/states';

export default class App extends Lightning.Component {
  static getFonts() {
    return [
      {
        family: 'Regular',
        url: Utils.asset('fonts/OpenSans-Regular.ttf')
      },
      {
        family: 'Bold',
        url: Utils.asset('fonts/OpenSans-Bold.ttf')
      }
    ];
  }

  static getLocale() {
    Locale.setLanguage('en');
    return Utils.asset('locale/locale.json');
  }

  static _template() {
    return {
      Splash: {
        type: Splash,
        signals: { animationFinished: true },
        alpha: 0
      },
      Background: {
        rect: true,
        w: 1920,
        h: 1080,
        alpha: 0,
        src: Utils.asset('images/ui/background.png')
      },
      TopMenu: {
        type: TopMenu,
        items: [
          { label: 'TV Shows', action: 'tvShowsActions' },
          { label: 'Movies', action: 'moviesAction' },
          { label: 'Recently Added', action: 'recentlyAddedAction' }
        ],
        alpha: 0,
        signals: { select: '_menuSelect' }
      },
      Details: {
        y: 150,
        x: 100,
        type: Details,
        alpha: 0
      },
      VideoPlayer: {
        type: VideoPlayer,
        alpha: 0,
        signals: { videoEnded: '_videoEnded' }
      },
      Seasons: {
        alpha: 0,
        y: 500,
        x: 100,
        type: Seasons
      },
      Popular: {
        x: 100,
        y: 550,
        type: Slider,
        alpha: 0
      }
    };
  }

  _construct() {
    this._api = new Api();
    this._data = null;
    this._activeItem = null;
  }

  $api() {
    return this._api;
  }

  _setup() {
    this._setState(SPLASH_STATE);
  }

  _init() {
    this._currentlyFocused = null;
  }

  _getFocused() {
    return this._currentlyFocused;
  }

  $onItemFocus({ item }) {
    this.tag(TAG_DETAILS).data = item;
    this.tag(TAG_BACKGROUND).src = Utils.asset(`${item.path}/backdrop.jpg`);
  }

  set data(data) {
    this._data = data;
  }

  get data() {
    return this._data;
  }

  set activeItem(item) {
    this._activeItem = item;
  }

  get activeItem() {
    return this._activeItem;
  }

  get movies() {
    return this.data.find(element => element.ref === REF_MOVIES).data;
  }

  get tvShows() {
    return this.data.find(element => element.ref === REF_TV_SHOWS).data;
  }

  get popularTvShows() {
    return this.tvShows.find(element => element.tag === TAG_POPULAR);
  }

  _populatePopularItems() {
    this.tag(TAG_POPULAR).patch({
      data: this.popularTvShows
    });
  }

  _populateSeasons() {
    const season = this.activeItem.seasons[0];
    this.tag(TAG_SEASONS).patch({
      itemSize: { w: season.itemWidth, h: season.itemHeight },
      items: season.items,
      label: season.label
    });
  }

  _populateDetailsData() {
    this.tag(TAG_DETAILS).data = this.activeItem;
  }

  static _states() {
    return [
      createSplashState(this),
      createTopMenuState(this),
      createDetailsState(this),
      createPopularState(this),
      createErrorState(this)
      // class SeasonsState extends this {
      //   $enter() {
      //     this.tag(TAG_SEASONS).setSmooth('alpha', 1);
      //     this._currentlyFocused = this.tag(TAG_SEASONS);
      //   }
      //
      //   $exit() {
      //     this.tag(TAG_SEASONS).setSmooth('alpha', 0);
      //     this._currentlyFocused = null;
      //   }
      // },
      // class VideoPlayerState extends this {}
    ];
  }
}
