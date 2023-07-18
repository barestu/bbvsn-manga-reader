import { registerRootComponent } from 'expo';
import App from './src/App';
import { LogBox } from 'react-native';

if (__DEV__) {
  import('./src/ReactotronConfig');
}

LogBox.ignoreAllLogs();

registerRootComponent(App);
