import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {SafeAreaView, Text, View, StyleSheet, Image} from 'react-native';
import Button from '../components/Button';
import _Appbar from "../components/Appbar";
import Constants from 'expo-constants'
import COLORS from "../components/Colors";


const logoapp = require('../assets/logoapp.png');

const HomeScree = ({navigation}) => {
  const [userDetails, setUserDetails] = React.useState();
  React.useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem('userData');
    if (userData) {
      setUserDetails(JSON.parse(userData));
    }
  };

  const logout = () => {
    AsyncStorage.setItem(
      'userData',
      JSON.stringify({...userDetails, loggedIn: false}),
    );
    navigation.navigate('Login');
  };

  const RegistroHistoriaClinica = () => {
    navigation.navigate('RegistroHistoriaClinica');
  }

  const BusquedaHistoriaClinica = () => {
    navigation.navigate('BusquedaHistoriaClinica');
  }

  return (
    <View style={{marginTop: Constants.statusBarHeight, flexGrow:1, backgroundColor: COLORS.white}}>
      <_Appbar {...navigation}/>
      <View style={{
        flex: 0,
        alignItems: 'center',
        paddingHorizontal: 40,
        marginTop: 50
      }}>
        <Image style={styles.image} source= {logoapp}></Image>
        <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center', paddingBottom: 30}}>
          Bienvenido(a) {userDetails?.usuario} a MEDREC APP, su sistema de digitalización de historias clinicas
        </Text>
        <Button title="REGISTRO DE HISTORIA CLÍNICA" onPress={RegistroHistoriaClinica} />
        <Button title="BÚSQUEDA DE HISTORIA CLÍNICA" onPress={BusquedaHistoriaClinica} />

      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 350,
    height: 350
  }
})

export default HomeScree;