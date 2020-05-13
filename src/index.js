import { Launch } from 'wpe-lightning-sdk';
import { App } from './components';

export default function() {
  return Launch(App, ...arguments);
}
