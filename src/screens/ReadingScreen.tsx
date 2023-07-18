import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Text } from 'native-base';
import React from 'react';
import { TStackParamsList } from '../App';

type IProps = NativeStackScreenProps<TStackParamsList, 'ReadingScreen'>;

export default function ReadingScreen({ route }: IProps) {
  const { slug } = route.params;
  return (
    <Box>
      <Text>ReadingScreen {slug}</Text>
    </Box>
  );
}
