import React from 'react';
import { ImageBackground } from 'react-native';
import { Box, Pressable, Text } from 'native-base';
import { IManga } from '../interfaces';

interface IMangaCardProps {
  item: IManga;
  onPress?: (item: IManga) => void;
}

export default function MangaCard({ item, onPress }: IMangaCardProps) {
  return (
    <Pressable h="56" w="1/2" px={2} mb={4} onPress={() => onPress?.(item)}>
      {({ isPressed }) => (
        <Box
          flex={1}
          rounded="lg"
          bg="gray.800"
          overflow="hidden"
          opacity={isPressed ? 0.5 : 1}
        >
          <ImageBackground
            source={{
              uri: `https://temp.compsci88.com/cover/${item.titleSlug}.jpg`,
            }}
            resizeMode="cover"
            style={{ flex: 1, justifyContent: 'flex-end' }}
          >
            <Box p={2}>
              <Text color="white">{item.title}</Text>
            </Box>
          </ImageBackground>
        </Box>
      )}
    </Pressable>
  );
}
