import React from "react";
import { StatusBar } from "expo-status-bar";
import Checkbox from "expo-checkbox";
import {
  Alert,
  Button,
  Keyboard,
  ScrollView,
  Modal,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Constants from 'expo-constants'

import { Icon, withTheme } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../components/Colors";
//import Button from "../components/Button";
import Input from "../components/Input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DivTop from "../components/DivTop";
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const TerminosCondiciones = ({ navigation }) => {
  const [reading, setReading] = React.useState(false);
  const [toggleCheckbox, setToggleCheckbox] = React.useState(false);
  const [isChecked, setChecked] = React.useState(false);
  const [isAceppted, setIsAceppted] = React.useState(false);
  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (isChecked == false) {
      //Alert.alert(
      //  "Error",
      //  "Datos ingresados incorrectos"
      //);
    }

    if (isChecked == true) {
      login();
    }
  };
  const updateState = () => {
    setChecked(!isChecked);
  };
  const login = () => {
    //setLoading(true);
    let validacion = true;
    if (validacion) {
      navigation.navigate("Inicio");
    }
  };

  return (
    <SafeAreaView style={{ marginTop: Constants.statusBarHeight, backgroundColor: COLORS.white, flex: 1 }}>
      <DivTop />
      <ScrollView
        contentContainerStyle={{ paddingTop: 20, paddingHorizontal: 20 }}
      >
        <Text style={{ color: COLORS.blue, fontSize: 30, fontWeight: "bold", textAlign: 'center' }}>
          TÉRMINOS Y CONDICIONES
        </Text>

        <View style={{marginTop: 30}}>
        <Text
          style={{
            color: COLORS.blue,
            fontSize: 25,
            backgroundColor: COLORS.darkBlue,
            paddingVertical: 15,
            paddingHorizontal: 30
          }}
        >
          Estos Términos y Condiciones de Uso regulan las reglas a que se sujeta la utilización de la APP(en adelante, la APP),
          que puede descargarse desde el dominio.
          La descarga o utilización de la APP atribuye la condición de Usuario a quien lo haga e implica la aceptación de todas las condiciones
          incluidas en este documento y en la Política de Privacidad y el Aviso Legal de dicha página Web. El Usuario debería leer estas condiciones cada vez
          que utilice la APP, ya que podrían ser notificadas en lo sucesivo.
        </Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20, marginLeft: 10 }}>
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? COLORS.darkBlue : undefined}
          />
          <Text>Aceptar términos y condiciones</Text>
        </View>

        <TouchableOpacity
          style={{ marginTop: 20}}
          disabled={!toggleCheckbox}
        ></TouchableOpacity>

        <Button
          color={isChecked ? COLORS.blue:"#BCBCBC"}
          title="Continuar"
          onPress={validate}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 32,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
    color: "red",
  },
  boton: {
    color: "red",
    backgroundColor: "red",
  },
});

export default TerminosCondiciones;
