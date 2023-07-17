import Reactotron from 'reactotron-react-native';

export default function log(...messages: any) {
  return Reactotron.log!(...messages);
}
