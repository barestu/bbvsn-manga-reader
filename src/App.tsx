import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import ReadingScreen from './screens/ReadingScreen';

export type TStackParamsList = {
  HomeScreen: undefined;
  DetailsScreen: { mangaId: string; slug?: string };
  ReadingScreen: { slug?: string };
};

const Stack = createNativeStackNavigator<TStackParamsList>();

export default function App() {
  // useEffect(() => {
  //   fetch(url)
  //     .then((res) => res.text())
  //     .then((html) => {
  //       const doc = IDOMParser.parse(html, {
  //         ignoreTags: ['script', 'style', 'head'],
  //         onlyBody: true,
  //       });

  //       const listSelector =
  //         '.MainContainer .BoxBody .row .col-md-8.order-md-1.order-12 .top-15';

  //       const listElements = doc.documentElement.querySelectorAll(listSelector);

  //       listElements.forEach((item) => {
  //         console.log('title', item.toString());
  //       });
  //     });
  // }, []);

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
          <Stack.Screen name="ReadingScreen" component={ReadingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
