import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppBar, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {Image} from 'react-native';
import React from 'react';
import {SafeAreaView, Text, View, StyleSheet, TouchableNativeFeedback, TouchableOpacity} from 'react-native';
import COLORS from './Colors';

const logoministerio = require('../assets/ministerio.png');
const logodoctor = require('../assets/doctor.jpg');

const _Appbar = (navigation) => {
  const [visibleOptions, setVisibleOptions] = React.useState();
  React.useEffect(() => {
    setVisibleOptions(false)
  }, []);

  const showOptions = () => {
    setVisibleOptions(!visibleOptions);
  }

  const editarPerfil = () => {
    setVisibleOptions(false);
    navigation? navigation.navigate('ActualizarPerfil'): alert("error");
  }

  const navigateHome = () => {
    setVisibleOptions(false);
    navigation.navigate("Inicio");
  }
  const logout = () => {
    setVisibleOptions(false);
    AsyncStorage.setItem(
      'userData',
      JSON.stringify({
        nombre: "",
        apellido: "",
        dni: "",
        correo: "",
        usuario: "",
        contraseña: "",
        loggedIn: false}),
    );
    navigation.navigate('Login');
  }
    return (
      <View>
        <AppBar
        style={{height:80, paddingTop: 10}}
        // title="Title"
        // subtitle="Lorem ipsum"
        // centerTitle={true}
        color={COLORS.blue}
        leading={props => (
          <TouchableNativeFeedback onPress={navigateHome} style={{backgroundColor: 'red'}}>
            <Image style={{    width: 220,height: 50}} source= {logoministerio}></Image>
         </TouchableNativeFeedback>
        )}
        trailing={props => (
          <TouchableNativeFeedback onPress={showOptions} style={{backgroundColor: 'red'}}>
           <Image style={{ marginRight:20, width: 50,height: 50, borderRadius: 100}} source= {logodoctor}></Image>
          </TouchableNativeFeedback>
        )}
        />

        <View style= {{ flex: 0, alignItems: 'flex-end', backgroundColor: COLORS.white}}>        
          {visibleOptions?
            <View style= {{ width: 100, backgroundColor: "#DDDDDD", marginRight:25}}>
              <TouchableOpacity onPress={editarPerfil} >
                <Text style={{ fontSize: 15}}>Editar Perfil</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={logout} style={{}}>
                <Text style={{ fontSize: 15}}>Salir</Text>
              </TouchableOpacity>
            </View> : 
            <View >
            </View>
          }
        </View>
      </View>

    )
}

const styles = StyleSheet.create({
  "button": {
    "background": "#ff4931",
    "boxShadow": "0 0 4px rgba(0, 0, 0, 0.3)",
    "transition": "all 200ms ease"
  },
  "button_hover": {
    "transition": "all 100ms ease",
    "transform": "scale(1.05)",
    "boxShadow": "0 0 8px rgba(0, 0, 0, 0.5)"
  },
  "button_active": {
    "transition": "all 50ms ease",
    "transform": "scale(1.03)",
    "background": "#e5432d"
  }
})



export default _Appbar;