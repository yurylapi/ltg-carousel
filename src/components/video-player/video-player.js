import { Lightning, MediaPlayer, Utils } from 'wpe-lightning-sdk';
import ProgressBar from './video-player.progress-bar';

export default class VideoPlayer extends Lightning.Component {
  static _template() {
    return {
      MediaPlayer: {
        type: MediaPlayer
      },
      Overlay: {
        w: 1920,
        rect: true,
        h: 300,
        mountY: 1,
        y: 1080,
        colorTop: 0x00000000,
        colorBottom: 0xff000000
      },
      Controls: {
        alpha: 0,
        x: 100,
        y: 1000,
        PlayPause: {
          src: Utils.asset('images/video-player/play.png')
        },
        Skip: { x: 50, src: Utils.asset('images/video-player/skip.png') },
        ProgressBar: {
          type: ProgressBar,
          x: 150,
          y: 7
        }
      }
    };
  }

  _init() {
    /**
     * We tell the media player which Component is consuming the events
     */
    this.tag('MediaPlayer').updateSettings({
      consumer: this
    });
  }

  _focus() {
    this.tag('Controls').alpha = 1;
  }

  _unfocus() {
    this.tag('Controls').alpha = 0;
  }

  play(src, loop = false, settings = {}) {
    this.tag('MediaPlayer').open(src, settings);
    this.tag('MediaPlayer').videoEl.style.display = 'block';
    this.tag('MediaPlayer').videoEl.loop = loop;
  }

  stop() {
    this.tag('MediaPlayer').close();
  }

  /**
   * This will be automatically called on video end
   * @param currentTime
   * @param duration
   */
  $mediaplayerEnded() {
    this.signal('videoEnded');
    this.stop();
  }

  _handleEnter() {
    this.tag('MediaPlayer').playPause();
  }

  $mediaplayerPause() {
    this._setState('PausedState');
  }

  /**
   * This will be automatically called on video end
   * @param currentTime
   * @param duration
   */
  $mediaplayerPlay() {
    this._setState('PlayingState');
  }

  static _states() {
    return [
      class LoadingState extends this {},
      class PlayingState extends this {
        $enter() {
          this.tag('PlayPause').src = Utils.asset('images/video-player/pause.png');
        }

        /**
         * This will be automatically called on timeupdate
         * @param currentTime
         * @param duration
         */
        $mediaplayerProgress({ currentTime, duration }) {
          this.tag('ProgressBar').setProgress(currentTime, duration);
        }
      },
      class PausedState extends this {
        $enter() {
          this.tag('PlayPause').src = Utils.asset('images/video-player/play.png');
        }

        _handleEnter() {
          this.tag('MediaPlayer').doPlay();
        }
      },
      class SkipState extends this {}
    ];
  }
}
