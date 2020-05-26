import { Lightning } from 'wpe-lightning-sdk';
import { CastItem, List } from '@/components';
import OverviewGenresItem from '@/components/overview/overview.genres.item';
import { TAG_CAST, TAG_GENRES } from '@/constants';

export default class Logo extends Lightning.Component {
  static _template() {
    return {
      Wrapper: {
        w: 1670,
        rect: true,
        color: '0x4C000000',
        flex: { direction: 'row', wrap: false, justifyContent: 'space-between', padding: 20 },
        Description: {
          flexItem: {},
          flex: { direction: 'column', wrap: false },
          Label: {
            text: { text: 'Overview', fontFace: 'Bold', fontSize: 32 }
          },
          Text: {
            w: 1200
          }
        },
        Genres: {
          w: 400,
          GenresLabel: {
            text: { text: 'Genres', fontFace: 'Bold', fontSize: 32 }
          },
          flexItem: {},
          flex: { direction: 'column', wrap: false }
        }
      },
      Cast: {
        y: 220,
        w: 1670,
        h: 250,
        type: List
      }
    };
  }

  /**
   * @param {{
   *  label: String,
   *  items: Object[],
   *  itemWidth: Number,
   *  itemHeight: Number,
   *  imageWidth: Number,
   *  imageHeight: Number
   *  }} cast
   * @param {String} path
   * @param {String} info
   * @param {String[]} genres
   */
  set overviewData({ cast, path, info, genres }) {
    genres.map(genre => {
      this.tag(TAG_GENRES).childList.a({
        type: OverviewGenresItem,
        genre
      });
    });

    this.patch({
      Wrapper: {
        Description: {
          Text: {
            text: {
              text: info,
              fontFace: 'Regular',
              fontSize: 24,
              lineHeight: 40
            }
          }
        }
      },
      Cast: {
        constructItem: CastItem,
        label: cast.label,
        imagePath: path,
        itemSize: { w: cast.itemWidth, h: cast.itemHeight, imageW: cast.imageWidth, imageH: cast.imageHeight },
        items: cast.items
      }
    });
  }

  _getFocused() {
    return this.tag(TAG_CAST);
  }
}
