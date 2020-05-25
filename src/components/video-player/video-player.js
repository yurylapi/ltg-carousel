import { Lightning, MediaPlayer, Utils } from 'wpe-lightning-sdk';
import ProgressBar from './video-player.progress-bar';
import { TAG_CONTROLS, TAG_MEDIA_PLAYER, TAG_PLAY_PAUSE, TAG_PROGRESS_BAR } from '@/constants';

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
    this.tag(TAG_MEDIA_PLAYER).updateSettings({
      consumer: this
    });
  }

  _focus() {
    this.tag(TAG_CONTROLS).alpha = 1;
  }

  _unfocus() {
    this.tag(TAG_CONTROLS).alpha = 0;
  }

  play(src, loop = false, muted = false, settings = {}) {
    const tag = this.tag(TAG_MEDIA_PLAYER);
    tag.open(src, settings);
    tag.videoEl.muted = muted;
    tag.videoEl.style.display = 'block';
    tag.videoEl.loop = loop;
  }

  isPlaying() {
    return this.tag(TAG_MEDIA_PLAYER).isPlaying();
  }

  stop() {
    this.tag(TAG_MEDIA_PLAYER).close();
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
    this.tag(TAG_MEDIA_PLAYER).playPause();
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
          this.tag(TAG_PLAY_PAUSE).src = Utils.asset('images/video-player/pause.png');
        }

        /**
         * This will be automatically called on timeupdate
         * @param currentTime
         * @param duration
         */
        $mediaplayerProgress({ currentTime, duration }) {
          this.tag(TAG_PROGRESS_BAR).setProgress(currentTime, duration);
        }
      },
      class PausedState extends this {
        $enter() {
          this.tag(TAG_PLAY_PAUSE).src = Utils.asset('images/video-player/play.png');
        }

        _handleEnter() {
          this.tag(TAG_MEDIA_PLAYER).doPlay();
        }
      },
      class SkipState extends this {}
    ];
  }
}
