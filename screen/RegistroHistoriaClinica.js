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

import COLORS from "../components/Colors";
import Button from "../components/Button";
import Input from "../components/Input";

import _Appbar from "../components/Appbar";
import Constants from 'expo-constants'
import { registerUser, getDNI } from "../services/userService";
import { createHistory } from "../services/historiaClinicaService";

import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from "react-native-gesture-handler";
import ButtonInput from "../components/ButtonInput";

const RegistroHistoriaClinica = ({ navigation }) => {

  const [show, setShow] = React.useState(false);

  const [inputs, setInputs] = React.useState({
    nombre: "",
    apellido: "",
    dni: "",
    numHistoria: "",
    fechaNacimiento: "",
    sexo: "",
  });

  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = async() => {
    Keyboard.dismiss();
    let isValid = true;

    const dataRecibidaDni = await getDNI(inputs.dni);

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
      } else {
        setTimeout(async () => {
          const dataRecibidaDni = await getDNI(inputs.dni);
          console.log("Respuesta del dni", dataRecibidaDni);
          if (dataRecibidaDni.dni == undefined) {
            handleError("DNI no valido", "dni");
            isValid = false;
          }
        });
      }
    }

    if (!inputs.numHistoria) {
      handleError("Ingresa numero Historia Clinica", "numHistoria");
      isValid = false;
    } 
    if (!inputs.fechaNacimiento) {
      handleError("Ingresa fecha de Nacimiento", "fechaNacimiento");
      isValid = false;
    }

    if (!inputs.sexo) {
      handleError("Ingresa sexo del paciente", "sexo");
      isValid = false;
    } 

    if (isValid) {
      register();
    }

  };



  const register = () => {
    //setLoading(true);
    setTimeout(async () => {
      try {
      // Convertir la fecha en string

      const nuevaFecha = convertDateToString(inputs.fechaNacimiento);

        const dataRecibida = await createHistory(inputs.nombre, inputs.apellido, inputs.dni, inputs.numHistoria, nuevaFecha, inputs.sexo);
        setLoading(false);
        if(dataRecibida.message == 'registro exitoso') {
          Alert.alert("Success", "Historia clinica creada correctamete");
          navigation.navigate("Inicio");
        }
        if(dataRecibida.message == 'historia clinica ya existe') {
            Alert.alert("Error", "Historia clinica ya existe");
        }
        if(dataRecibida.message == 'faltan datos') {
            Alert.alert("Error", "Faltan Datos");
        }
      } catch (error) {
        Alert.alert("Error", "Something went wrong");
      }
    }, 10);
  };

  const mostrarHorario = () => {
    setShow(true)
  }

  const onChange = (event, selectedDate) => {
    setShow(false);
    const nuevaFecha = selectedDate;
    handleOnchange(selectedDate, "fechaNacimiento");
    handleOnchange(nuevaFecha, "fechaNacimiento");
  };

  const convertDateToString = (date) => {
    let dia = date.getDate();
    let mes = date.getMonth() + 1;
    let anio = date.getFullYear();
    if(dia < 10) {
      dia = '0' + dia
    }
    if(mes < 10) {
      mes = '0' + mes
    }
    const fecharetornar = dia + "/" + mes + "/" + anio
    return fecharetornar
  }

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };
  return (
    <View style={{marginTop: Constants.statusBarHeight, flexGrow:1}}>
    <_Appbar {...navigation}/>
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}
      >
        <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: "bold" }}>
          Registro de Historia Clinica
        </Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            onChangeText={(text) => handleOnchange(text, "nombre")}
            onFocus={() => handleError(null, "nombre")}
            iconName="account-circle"
            label="Nombres"
            autoCapitalize={"characters"}
            //placeholder="Ingresa tus nombres"
            error={errors.nombre}
          />

          <Input
            onChangeText={(text) => handleOnchange(text, "apellido")}
            onFocus={() => handleError(null, "apellido")}
            iconName="account-circle"
            label="Apellidos"
            autoCapitalize={"characters"}
            //placeholder="Ingresa tus apellidos"
            error={errors.apellido}
          />

          <Input
            keyboardType="numeric"
            onChangeText={(text) => handleOnchange(text, "dni")}
            onFocus={() => handleError(null, "dni")}
            iconName="card-account-details-outline"
            label="DNI"
            //placeholder="Enter your phone no"
            error={errors.dni}
          />
          <Input
            onChangeText={(text) => handleOnchange(text, "numHistoria")}
            onFocus={() => handleError(null, "numHistoria")}
            iconName="note-text"
            label="Número de Historia Clinica"
            //placeholder="Enter your phone no"
            error={errors.numHistoria}
          />
          
          <ButtonInput 
            onPress={mostrarHorario}
            iconName="calendar"
            label="Fecha de Nacimiento"
            valor={inputs.fechaNacimiento? convertDateToString(inputs.fechaNacimiento): ''}
          />

          <Input
            onChangeText={(text) => handleOnchange(text, "sexo")}
            onFocus={() => handleError(null, "sexo")}
            iconName="gender-male"
            label="Sexo"
            //placeholder="Enter your password"
            error={errors.sexo}
          />
          { show?
            <DateTimePicker 
            value={inputs.fechaNacimiento? new Date(inputs.fechaNacimiento): new Date()}
            mode='date'
            onChange={onChange}
            />:
            <View></View>
          }

          <Button title="Registro" onPress={validate} />
        </View>
      </ScrollView>
    </SafeAreaView>
    </View>
  );
};

export default RegistroHistoriaClinica;
