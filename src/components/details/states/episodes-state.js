import { DETAILS_CONTROL_STATE, OVERVIEW_STATE, TAG_BACKGROUND, TAG_EPISODES } from '@/constants';

export const createEpisodesState = base =>
  class EpisodesState extends base {
    $enter() {
      const tagEpisodes = this.tag(TAG_EPISODES);
      this._currentlyFocused = tagEpisodes;
      tagEpisodes.setSmooth('alpha', 1);
      tagEpisodes.setSmooth('y', 550);
      this.tag(TAG_BACKGROUND).setSmooth('alpha', 1);
    }

    $exit() {
      const tagEpisodes = this.tag(TAG_EPISODES);
      this._currentlyFocused = null;
      tagEpisodes.setSmooth('alpha', 0);
      tagEpisodes.setSmooth('y', -400);
    }

    _handleUp() {
      this._setState(DETAILS_CONTROL_STATE);
    }

    _handleDown() {
      this._setState(OVERVIEW_STATE);
    }
  };
