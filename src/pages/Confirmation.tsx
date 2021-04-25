import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

import { Button } from '../components/Button';

export function Confirmation(): JSX.Element {
  const navigation = useNavigation();
  function handleMoveOn() {
    navigation.navigate('PlantSelect');
  }
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>😄</Text>

        <Text style={styles.title}>Prontinho</Text>

        <Text style={styles.subtitle}>
          Agora vamos começar a cuidar das suas plantinhas com muito cuidado.
        </Text>

        <View style={styles.footer}>
          <Button text="Confirmar" onPress={handleMoveOn} />
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
