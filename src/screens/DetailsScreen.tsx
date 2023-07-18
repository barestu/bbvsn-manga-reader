import React, { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, FlatList, Image, Pressable, Row, Text } from 'native-base';

import { TStackParamsList } from '../App';
import { mangaSeeSource } from '../source/MangaSee';

type TProps = NativeStackScreenProps<TStackParamsList, 'DetailsScreen'>;

function DetailsScreen({ route, navigation }: TProps) {
  const { slug } = route.params;

  const [chapters, setChapters] = useState<any[]>([]);

  useEffect(() => {
    if (slug) {
      mangaSeeSource.getChapterList(slug).then((data) => setChapters(data));
    }
  }, [slug]);

  const handleOpenChapter = (chapterSlug: string) => {
    navigation.push('ReadingScreen', {
      slug: chapterSlug,
    });
  };

  const renderHeader = () => {
    return (
      <Row py={4} px={4}>
        <Box flex={1} mr={4}>
          <Image
            source={{
              uri: `https://temp.compsci88.com/cover/${slug}.jpg`,
            }}
            alt="Cover"
            width="full"
            height="40"
            resizeMode="cover"
            rounded="lg"
          />
        </Box>
        <Box flex={2}>
          <Text fontSize="xl" fontWeight="semibold">
            {slug}
          </Text>
          <Text>Author(s): KISHIMOTO Masashi</Text>
          <Text>
            Genre(s): Action, Adventure, Comedy, Drama, Fantasy, Shounen
          </Text>
          <Text>Released: 1999</Text>
          <Text>Status: Complete</Text>
        </Box>
      </Row>
    );
  };

  const renderItem = (item: any) => {
    const chNumber = (+item.Chapter - 100_000) / 10;
    const chSlug = `${slug}-${chNumber}`;

    return (
      <Pressable
        px={4}
        py={4}
        flex={1}
        borderBottomWidth={1}
        onPress={() => handleOpenChapter(chSlug)}
      >
        {({ isPressed }) => (
          <Box opacity={isPressed ? 0.5 : 1}>
            <Text>
              {item.Type} {chNumber}
            </Text>
            <Text fontSize={12} color="gray.500">
              {item.Date} - MangaSee
            </Text>
          </Box>
        )}
      </Pressable>
    );
  };

  return (
    <Box>
      <FlatList
        data={chapters}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => renderItem(item)}
        ListHeaderComponent={renderHeader}
      />
    </Box>
  );
}

export default DetailsScreen;
