import React from 'react';
import { ScrollView, StyleProp, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from '../../app/(styles)/test_style';

type Props = { style?: StyleProp<ViewStyle>; children: React.ReactNode };

export default function SafeScroll({ style, children }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }, style]}>
      {children}
    </ScrollView>
  );
}
