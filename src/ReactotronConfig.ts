import AsyncStorage from '@react-native-async-storage/async-storage';
import Reactotron from 'reactotron-react-native';

// For android, run: adb reverse tcp:9090 tcp:9090
Reactotron.setAsyncStorageHandler!(AsyncStorage)
  .configure({ name: 'Bbvsn Manga' })
  .useReactNative()
  .connect();

Reactotron.clear?.();
