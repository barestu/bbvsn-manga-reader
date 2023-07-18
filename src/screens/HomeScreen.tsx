import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AntDesign } from '@expo/vector-icons';
import { Box, FlatList, IconButton, Input, Row } from 'native-base';

import { TStackParamsList } from '../App';
import { IManga } from '../interfaces';
import MangaCard from '../components/MangaCard';
import { mangaSeeSource } from '../source/MangaSee';

type TProps = NativeStackScreenProps<TStackParamsList, 'HomeScreen'>;

export default function HomeScreen({ navigation }: TProps) {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<IManga[]>([]);

  const handleSearch = async () => {
    try {
      const res: any = await mangaSeeSource.search(search);
      setResults(res);
    } catch (err) {
      setResults([]);
    }
  };

  const handleOpenManga = (item: IManga) => {
    navigation.push('DetailsScreen', {
      mangaId: item.id,
      slug: item.titleSlug,
    });
  };

  return (
    <Box>
      <Row space={2} p={4}>
        <Box flex={1}>
          <Input
            placeholder="Search..."
            size="lg"
            value={search}
            onChangeText={setSearch}
            clearButtonMode="always"
          />
        </Box>
        <IconButton
          icon={<AntDesign name="search1" color="white" />}
          size="lg"
          variant="solid"
          onPress={handleSearch}
        />
      </Row>

      <FlatList
        px={2}
        numColumns={2}
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MangaCard item={item} onPress={handleOpenManga} />
        )}
      />
    </Box>
  );
}
