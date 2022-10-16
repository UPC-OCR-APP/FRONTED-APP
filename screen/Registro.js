import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Alert,
} from "react-native";
import { Image } from "react-native";

import Constants from "expo-constants";
import { registerUser, getDNI } from "../services/userService";
import { getEmail } from "../services/userService";

import COLORS from "../components/Colors";
import Button from "../components/Button";
import Input from "../components/Input";
import DivTop from "../components/DivTop";

//import Loader from '../components/Loader';
const logoministerio = require("../assets/ministerio.png");

const RegistrationScreen = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    nombre: "",
    apellido: "",
    dni: "",
    correo: "",
    usuario: "",
    contraseña: "",
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;

    const dataRecibidaDni = await getDNI(inputs.dni);
    const dataRecibidaEmail = await getEmail(inputs.correo);

    console.log("asd", dataRecibidaDni)
    if (dataRecibidaDni.dni == undefined) {
      handleError("DNI no valido", "dni");
      isValid = false;
      return;
    }

    if (!inputs.nombre) {
      handleError("Ingresa tu nombre", "nombre");
      isValid = false;
    } else {
      if (inputs.nombre != dataRecibidaDni.nombres) {
        handleError("Nombre(s) no compatible(s) con DNI", "nombre");
        isValid = false;
      }
    }

    if (!inputs.apellido) {
      handleError("Ingresa tu apellido", "apellido");
      isValid = false;
    } else {
      if (
        inputs.apellido !=
        dataRecibidaDni.apellidoPaterno  + " " +  dataRecibidaDni.apellidoMaterno
      ) {
        handleError("Apellidos no compatibles con DNI", "apellido");
        isValid = false;
      }
    }

    if (!inputs.dni) {
      handleError("Ingresa tu D.N.I.", "dni");
      isValid = false;
    } else {
      if (inputs.dni.length != 8) {
        handleError("La longitud del D.N.I. es 8", "dni");
        isValid = false;
      }
    }

    if (!inputs.correo) {
      handleError("Ingresa tu correo", "correo");
      isValid = false;
    } else if (!inputs.correo.match(/\S+@\S+\.\S+/)) {
      handleError("Ingresa un correo válido", "correo");
      isValid = false;
    }

    if (dataRecibidaEmail.deliverability != "DELIVERABLE") {
      handleError("Correo no valido", "correo");
      isValid = false;
    }



    if (!inputs.usuario) {
      handleError("Ingresa tu usuario", "usuario");
      isValid = false;
    }

    if (!inputs.contraseña) {
      handleError("Ingresa tu contraseña", "contraseña");
      isValid = false;
    } else if (inputs.contraseña.length < 8) {
      handleError("La longitud mínima de la constraseña es 8", "contraseña");
      isValid = false;
    }

    if (isValid) {
      setInputs({
        nombre: "",
        apellido: "",
        dni: "",
        correo: "",
        usuario: "",
        contraseña: "",
      });
      register();
    }
  };

  const register = async () => {
    //setLoading(true);
    setTimeout(async () => {
      try {
        const dataRegisterUser = await registerUser(
          inputs.nombre,
          inputs.apellido,
          inputs.dni,
          inputs.correo,
          inputs.usuario,
          inputs.contraseña
        );
        setLoading(false);

        if (dataRegisterUser.message == "registro") {
          AsyncStorage.setItem("userData", JSON.stringify(inputs));
          navigation.navigate("TerminosCondiciones");
        }
        if (dataRegisterUser.message == "usuario o correo en uso") {
          Alert.alert("Error", "Usuario o correo en uso");
        }
        if (dataRegisterUser.message == "faltan datos") {
          Alert.alert("Error", "Faltan Datos");
        }
      } catch (error) {
        Alert.alert("Error", "Something went wrong");
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
    <SafeAreaView
      style={{
        marginTop: Constants.statusBarHeight,
        backgroundColor: COLORS.white,
        flex: 1,
      }}
    >
      <DivTop />
      <ScrollView
        contentContainerStyle={{ paddingTop: 20, paddingHorizontal: 20 }}
      >
        <Text
          style={{
            color: COLORS.blue,
            fontSize: 40,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Registro
        </Text>

        <View style={{ marginVertical: 20 }}>
          <Input
            onChangeText={(text) => handleOnchange(text, "nombre")}
            autoCapitalize={"characters"}
            onFocus={() => handleError(null, "nombre")}
            iconName="account-circle"
            label="Nombres"
            //placeholder="Ingresa tus nombres"
            error={errors.nombre}
          />

          <Input
            onChangeText={(text) => handleOnchange(text, "apellido")}
            onFocus={() => handleError(null, "apellido")}
            autoCapitalize={"characters"}
            iconName="account-circle"
            label="Apellidos"
            //placeholder="Ingresa tus apellidos"
            error={errors.apellido}
          />

          <Input
            keyboardType="numeric"
            onChangeText={(text) => handleOnchange(text, "dni")}
            onFocus={() => handleError(null, "dni")}
            iconName="card-account-details-outline"
            label="D.N.I"
            //placeholder="Enter your phone no"
            error={errors.dni}
          />
          <Input
            onChangeText={(text) => handleOnchange(text, "correo")}
            onFocus={() => handleError(null, "correo")}
            iconName="email-outline"
            label="Correo"
            //placeholder="Enter your phone no"
            error={errors.correo}
          />
          <Input
            onChangeText={(text) => handleOnchange(text, "usuario")}
            onFocus={() => handleError(null, "usuario")}
            iconName="account-box-outline"
            label="Usuario"
            //placeholder="Enter your phone no"
            error={errors.usuario}
          />
          <Input
            onChangeText={(text) => handleOnchange(text, "contraseña")}
            onFocus={() => handleError(null, "contraseña")}
            iconName="lock-outline"
            label="Contraseña"
            //placeholder="Enter your password"
            error={errors.contraseña}
            password
          />
          <Button title="Registro" onPress={validate} />
          <Text
            onPress={() => navigation.navigate("Login")}
            style={{
              color: COLORS.black,
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 16,
            }}
          >
            ¿Ya tienes una cuenta? Inicia sesión
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegistrationScreen;
