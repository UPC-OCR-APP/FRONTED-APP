import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Keyboard,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image
} from "react-native";
import { Icon, withTheme } from "@rneui/themed";
import DivTop from "../components/DivTop";
import { LinearGradient } from "expo-linear-gradient";
import { getAllUsers, loginUser } from "../services/userService";
import Constants from 'expo-constants'

import COLORS from "../components/Colors";
import Button from "../components/Button";
import Input from "../components/Input";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
const logoapp = require('../assets/logoapp.png');


const Login = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({ usuario: "jiep17", contraseña: "12345678" });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = async () => {
    
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.usuario) {
      handleError("Ingrese su usuario", "usuario");
      isValid = false;
    }
    if (!inputs.contraseña) {
      handleError("Ingrese su contraseña", "contraseña");
      isValid = false;
    } else if (inputs.contraseña.length < 4) {
      handleError("La longitud mínima de la constraseña es 8", "contraseña");
      isValid = false;
    }

    if (isValid) {
      login();
    }
  };

  const login = async () => {
    //setLoading(true);


    setTimeout(async () => {
      
      const dataLoginUser = await loginUser(inputs.usuario, inputs.contraseña);
      // No lo he implementado porque el metodo no me devuelve lo necesario xd
      setLoading(false);

      if(dataLoginUser.message == undefined) {
        const newUser = {
          nombre: dataLoginUser.nombre,
          apellido: dataLoginUser.apellido,
          dni: dataLoginUser.dni,
          correo: dataLoginUser.email,
          usuario: dataLoginUser.usuario,
          contraseña: inputs.contraseña,
        }

        AsyncStorage.setItem("userData", JSON.stringify(newUser));
        navigation.navigate("Inicio");
        
      }
      else {
        Alert.alert("Error", "El usuario o contraseña incorrecta");
      }
    }, 10);
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  return (
    <SafeAreaView style={{ marginTop: Constants.statusBarHeight, backgroundColor: COLORS.white, flex: 1 }}>
      <DivTop />
      <ScrollView>
      <View style={{paddingTop: 30, flexDirection: 'row', justifyContent: 'center'}}> 
        <Image style={styles.image} source= {logoapp}></Image>
      </View>
      
      <View style={{ paddingHorizontal: 20 }}>
        <View style={{ marginVertical: 20 }}>
          <Input
            onChangeText={(text) => handleOnchange(text, "usuario")}
            onFocus={() => handleError(null, "usuario")}
            iconName="account-circle"
            label="Usuario"
            placeholder="Ingresa tu usuario"
            error={errors.usuario}
          />
          <Input
            onChangeText={(text) => handleOnchange(text, "contraseña")}
            onFocus={() => handleError(null, "contraseña")}
            iconName="lock-outline"
            label="Contraseña"
            placeholder="Ingresa tu contraseña"
            error={errors.contraseña}
            password
          />
          <Button title="ENTRAR" onPress={validate} />
          <Text
            onPress={() => navigation.navigate("Registro")}
            style={{
              color: COLORS.black,
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 16,
            }}
          >
            ¿Aún no tienes una cuenta? Registrate
          </Text>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300
  }
})

export default Login;
