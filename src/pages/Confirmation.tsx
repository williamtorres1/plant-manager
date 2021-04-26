import { useNavigation, useRoute } from '@react-navigation/core';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

import { Button } from '../components/Button';

interface Params {
  title: string;
  subtitle: string;
  buttonTitle: string;
  icon: 'smile' | 'hug';
  nextScreen: string;
}

const emojis = {
  smile: '😄',
  hug: '🤗',
};

export function Confirmation(): JSX.Element {
  const navigation = useNavigation();
  const routes = useRoute();

  const {
    title,
    subtitle,
    buttonTitle,
    nextScreen,
    icon,
  } = routes.params as Params;

  function handleMoveOn() {
    navigation.navigate(nextScreen);
  }
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>{emojis[icon]}</Text>

        <Text style={styles.title}>{title}</Text>

        <Text style={styles.subtitle}>{subtitle}</Text>

        <View style={styles.footer}>
          <Button text={buttonTitle} onPress={handleMoveOn} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 30,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 22,
    textAlign: 'center',
    color: colors.heading,
    lineHeight: 38,
    marginTop: 15,
  },
  subtitle: {
    fontFamily: fonts.text,
    textAlign: 'center',
    fontSize: 17,
    // paddingHorizontal: 10,
    color: colors.heading,
  },
  emoji: {
    fontSize: 78,
  },
  footer: {
    width: '100%',
    paddingHorizontal: 50,
    marginTop: 20,
  },
});
