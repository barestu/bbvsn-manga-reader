import { registerRootComponent } from 'expo';
import App from './src/App';

if (__DEV__) {
  import('./src/ReactotronConfig');
}

registerRootComponent(App);
