import React, { useState } from 'react';
import { Text, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import colors from '../../styles/colors';
import { Button } from '../components/Button';

import wateringImg from './watering.png';

export function Welcome() {
  const [visible, setVisible] = useState(true);

  function handleVisibility() {
    setVisible(!visible)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Gerencie {'\n'} suas plantas {'\n'}de forma fácil</Text>

      { visible && <Image source={wateringImg} style={styles.image} />}
      <Text style={styles.subtitle}>Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você sempre que precisar</Text>

      <Button title=">" onPress={handleVisibility} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.heading
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading
  },
  button: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
    paddingHorizontal: 10,
    // width: 56,
  },
  buttonText: {
    color: colors.white,
    fontSize: 24,
  },
  image: {
    width: 292,
    height: 294
  }
})