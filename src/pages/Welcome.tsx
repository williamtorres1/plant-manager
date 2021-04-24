import React from 'react';
import { Text, Image, StyleSheet, TouchableOpacity, Dimensions, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';

//https://github.com/oblador/react-native-vector-icons
import { Feather } from "@expo/vector-icons";

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

import wateringImg from './watering.png';

export function Welcome() {
  const navigation = useNavigation()
  function handleStart() {
    navigation.navigate('UserIdentification')
  }
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Gerencie {'\n'} suas plantas de {'\n'}forma fácil</Text>

        <Image source={wateringImg} style={styles.image} resizeMode="contain" />

        <Text style={styles.subtitle}>Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você sempre que precisar</Text>

        <TouchableOpacity 
          style={styles.button} 
          activeOpacity={0.7}
          onPress={handleStart}
          >
          <Feather style={styles.buttonIcon} name="chevron-right" />
        </TouchableOpacity>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around', //Para não encostar nas bordas
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.heading,
    lineHeight: 34
  },
  subtitle: {
    fontFamily: fonts.text,
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
    width: 56,
  },
  buttonIcon: {
    color: colors.white,
    fontSize: 30,
  },
  image: {
    height: Dimensions.get('window').width * 0.7
  }
})