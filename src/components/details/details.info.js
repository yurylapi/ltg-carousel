import {Lightning, Utils} from 'wpe-lightning-sdk';

export default class DetailsInfo extends Lightning.Component {
  static _template() {
    return {
      ImageTitle: {},
      InfoBlock: {
        y: 180,
        flex: { direction: 'row', padding: 20, wrap: false, justifyContent: 'space-between' },
        w: 500,
        Rating: {
          flexItem: { margin: 10 },
          text: {
            fontFace: 'Regular',
            fontSize: 24,
            fontStyle: 'bold',
            fontAlign: 'center'
          }
        },
        Year: {
          flexItem: { margin: 10 },
          text: {
            fontFace: 'Regular',
            fontSize: 24,
            fontAlign: 'center'
          }
        },
        PGRating: {
          flexItem: { margin: 10 },
          zIndex: 1,
          text: {
            fontFace: 'Regular',
            fontSize: 24,
            fontAlign: 'center'
          },
          RatingBorder: {
            zIndex: 0,
            x: -8,
            texture: Lightning.Tools.getRoundRect(53, 30, 4, 1, 0xffffffff, true, 0x00ffffff)
          }
        }
      }
    };
  }

  set info({ year, rating, pgRating, imageTitle }) {
    this.patch({
      ImageTitle: {
        texture: {
          resizeMode: {
            type: 'contain',
            w: 720,
            h: 250
          },
          type: Lightning.textures.ImageTexture,
          src: Utils.asset(imageTitle)
        }
      },
      InfoBlock: {
        Rating: {
          text: { text: `${rating}% Match` }
        },
        Year: {
          text: { text: year }
        },
        PGRating: {
          text: { text: `${pgRating}+` }
        }
      }
    });
  }
}
