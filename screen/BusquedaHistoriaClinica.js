import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";

import {
  getHistoryByName,
  getHistoryByDni,
} from "../services/historiaClinicaService";
import COLORS from "../components/Colors";
import Button from "../components/Button";
import Input from "../components/Input";
import _Appbar from "../components/Appbar";
import Constants from "expo-constants";

const BusquedaHistoriaClinica = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    nombre: "",
    dni: "",
  });

  const [historiaEncontrada, setHistoriaEncontrada] = React.useState({
    numHistory: "",
    dni: "",
    apellido: "",
    nombre: "",
  });

  const [showHistoriaClinica, setShowHistoriaClinica] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const entrarHistoriaClinica = () => {
    navigation.navigate("HistoriaClinica", {
      dni: historiaEncontrada.dni,
      numHistory: historiaEncontrada.numHistory,
    });
  };

  const buscarDni = () => {
    setTimeout(async () => {
      try {
        const dataRecibida = await getHistoryByDni(inputs.dni);
        setLoading(false);

        if (dataRecibida.message == "Historia clinica no existe") {
          // Si por DNI NO EXISTE BUSCA POR NOMBRE
          if (inputs.nombre != "") {
            buscarNombre();
          } else {
            setShowHistoriaClinica(false);
            Alert.alert("Error", "No se han encontrado Historias Clinicas");
          }
        } else {
          setHistoriaEncontrada(dataRecibida);
          setShowHistoriaClinica(true);
        }
      } catch (error) {
        Alert.alert("Error", "Something went wrong", error);
      }
    });
  };

  const buscarNombre = () => {
    setTimeout(async () => {
      try {
        let arra_nombre = inputs.nombre.split(" ");
        if (arra_nombre.length == 2) {
          const dataRecibida = await getHistoryByName(
            arra_nombre[0],
            arra_nombre[1]
          );
          setLoading(false);

          if (dataRecibida.message == "Historia clinica no existe") {
            setShowHistoriaClinica(false);
            Alert.alert("Error", "No se han encontrado Historias Clinicas");
          } else {
            setHistoriaEncontrada(dataRecibida);
            setShowHistoriaClinica(true);
          }
        } else {
          Alert.alert("Error", "La busqueda es por Nombre y Apellido");
        }
      } catch (error) {
        Alert.alert("Error", "Something went wrong", error);
      }
    });
  };

  const buscar = () => {
    if (inputs.dni != "") {
      buscarDni();
    } else {
      buscarNombre();
    }
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  return (
    <View style={{ marginTop: Constants.statusBarHeight, flexGrow: 1 }}>
      <_Appbar {...navigation} />
      <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}
        >
          <Text
            style={{
              color: COLORS.black,
              fontSize: 40,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            BÚSQUEDA DE HISTORIA CLÍNICA
          </Text>
          <View style={{ marginVertical: 20 }}>
            <Input
              onChangeText={(text) => handleOnchange(text, "nombre")}
              onFocus={() => handleError(null, "nombre")}
              iconName="account-circle"
              label="Apellidos y Nombres"
              //placeholder="Ingresa tus nombres"
              error={errors.nombre}
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

            <Button title="Buscar" onPress={buscar} />
          </View>

          {showHistoriaClinica ? (
            <View
              style={{
                marginVertical: 20,
                // backgroundColor: COLORS.light,
                borderColor: COLORS.darkBlue,
                borderWidth: 2,
                padding: 10,
              }}
            >
              <Text
                style={{ width: "100%", color: COLORS.black, fontSize: 18 }}
              >
                N° de Historia Clinica: {historiaEncontrada.numHistory}
              </Text>
              <Text
                style={{ width: "100%", color: COLORS.black, fontSize: 18 }}
              >
                D.N.I: {historiaEncontrada.dni}
              </Text>
              <Text
                style={{ width: "100%", color: COLORS.black, fontSize: 18 }}
              >
                Apellidos: {historiaEncontrada.apellido}
              </Text>
              <Text
                style={{ width: "100%", color: COLORS.black, fontSize: 18 }}
              >
                Nombres: {historiaEncontrada.nombre}
              </Text>
              <View style={{ flexDirection: "row", marginVertical: 10 }}></View>

              <View style={{ alignItems: "center" }}>
                <View style={{ width: "30%" }}>
                  <Button title="ENTRAR" onPress={entrarHistoriaClinica} />
                </View>
              </View>
            </View>
          ) : (
            <View></View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default BusquedaHistoriaClinica;
