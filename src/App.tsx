import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import IDOMParser from 'advanced-html-parser';
import { mangaSeeSource } from './source/MangaSee';
import log from './utils/log';

export default function App() {
  const [isSynching, setIsSynching] = useState(false);
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

  const handleSyncSource = async () => {
    try {
      setIsSynching(true);
      await mangaSeeSource.syncSource();
    } catch (err) {
      log(err);
      Alert.alert('Sync Failed', 'Something wrong happen');
    } finally {
      setIsSynching(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Button
        title={isSynching ? 'Synching...' : 'Sync Source'}
        onPress={handleSyncSource}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
