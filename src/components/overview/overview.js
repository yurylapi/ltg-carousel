import { Lightning } from 'wpe-lightning-sdk';
import { Cast } from '@/components';
import OverviewGenresItem from '@/components/overview/overview.genres.item';
import { TAG_GENRES } from '@/constants';

export default class Logo extends Lightning.Component {
  static _template() {
    return {
      Wrapper: {
        w: 1700,
        flex: { direction: 'row', wrap: false, justifyContent: 'space-between' },
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
        type: Cast
      }
    };
  }

  /**
   * @param {{ label: String, items: Array, itemWidth: Number, itemHeight: Number }} cast
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
        items: cast,
        path: path
      }
    });
  }
}
