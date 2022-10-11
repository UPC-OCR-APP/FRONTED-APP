import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Alert,
  TouchableOpacity
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import COLORS from "../components/Colors";
import Button from "../components/Button";
import Input from "../components/Input";
import _Appbar from "../components/Appbar";
import Constants from 'expo-constants'
import { getHistoryByDni,  getConsultaByHistoria, filtrarConsultaFecha } from "../services/historiaClinicaService";

// ----------------------------------------------------------------
//import React, { Component, useRef } from "react";
//import { Button, SafeAreaView, StyleSheet, Alert, Text } from "react-native";

//Importing the installed libraries
import * as FS from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import base_url from "../components/BaseUrl";
import ButtonIcon from "../components/ButtonIcon";

// ----------------------------------------------------------------


//----------------------------------------------------------------
const HistoriaClinica = ({ navigation, route, props }) => {

  const isFocused = useIsFocused();

  React.useEffect(() => {
       buscar();              
  }, [props, isFocused]);

  const [inputs, setInputs] = React.useState({
    fecha: "",
  });

  const [historiaEncontrada, setHistoriaEncontrada] = React.useState({
    numHistory: "",
    dni: "",
    apellido: "",
    nombre: "",
    sexo: "",
    nacimiento: ""
  })

  const [arregloRecibido, setArregloRecibido] = React.useState();

  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
 
  const entrarDigitalizar = () => {
    navigation.navigate("Camara")
  }

  const takePicture = async (uri) => {
    
    let result = await ImagePicker.launchCameraAsync({
      //allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
      includeBase64: true,
    });

    if (result.cancelled) {
      return;
    }
  
    if (result.type == "image") {
      await toServer({
        type: result.type,
        base64: result.base64,
        uri: result.uri,
      });
      navigation.navigate("AtencionConsulta" , { dni: route.params.dni, numHistory: route.params.numHistory});
    } else {
      let base64 = await this.uriToBase64(result.uri);
      await toServer({
        type: result.type,
        base64: base64,
        uri: result.uri,
      });
    }
  };
  
  const editarConsulta = async () => {
    console.log("Editando");
  }

  const filtrarConsulta = async () => {
    setTimeout(async () => {
      try {
        const _arregloRecibido = await filtrarConsultaFecha(inputs.fecha);
        setArregloRecibido(_arregloRecibido)
      } catch (error) {
        Alert.alert("Error", "Something went wrong", error);
      }
    })
  }

  const visualizarConsulta  = async (item) => {
    navigation.navigate("AtencionConsulta", { item: item, dni: route.params.dni, numHistory: route.params.numHistory})
  }

  const toServer = async (mediaFile) => {
    let type = mediaFile.type;
    let schema = "http://";
    let host = "192.168.1.13";//cambiar
    let route1 = "";
    let port = "8000";
    let url = "";
    let content_type = "";
    type === "image"
      ? ((route1 = "/image"), (content_type = "image/jpeg"))
      : ((route1 = "/video"), (content_type = "video/mp4"));
    url = base_url + route1;
  
    let response = await FS.uploadAsync(url, mediaFile.uri, {
      headers: {
        "content-type": content_type,
      },
      httpMethod: "POST",
      uploadType: FS.FileSystemUploadType.BINARY_CONTENT,
    });
  
  };

  const buscar = () => {
    setTimeout(async () => {
      try {
        const dataRecibida = await getHistoryByDni(route.params.dni);
        setLoading(false);

        if(dataRecibida.message == 'Historia clinica no existe') {
          Alert.alert("Error", "No se han encontrado Historias Clinicas");
        } else {
          setHistoriaEncontrada(dataRecibida)
        }

        const _arregloRecibido = await getConsultaByHistoria(route.params.numHistory);
        setArregloRecibido(_arregloRecibido)

      } catch (error) {
        Alert.alert("Error", "Something went wrong", error);
      }
    })
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
            contentContainerStyle={{ paddingHorizontal: 20 }}
        >
            <Text style={{ color: COLORS.blue, fontSize: 40, fontWeight: "bold", textAlign: "center" }}>
            HISTORIA CLÍNICA
            </Text>
            <View style={{ marginVertical: 20,             
                // backgroundColor: COLORS.light,
                borderColor: COLORS.darkBlue,
                borderWidth: 2, padding: 10}}>
                <Text style={{ width:'100%', color: COLORS.black, fontSize: 18}}>
                    N° de Historia Clinica: {historiaEncontrada.numHistory}
                </Text>
                <View  style= {{ flexDirection: 'row', marginVertical: 10}}>
                  <Text style={{ width:'100%', color: COLORS.black, fontSize: 18}}>
                    Nombres: {historiaEncontrada.nombre}
                  </Text>
                </View>
                <Text style={{ width:'100%', color: COLORS.black, fontSize: 18}}>
                    Apellidos: {historiaEncontrada.apellido}
                  </Text>
                <View  style= {{ flexDirection: 'row', marginVertical: 10}}>
                  <Text style={{ width:'50%', color: COLORS.black, fontSize: 18}}>
                    D.N.I: {historiaEncontrada.dni} 
                  </Text>
                  <Text style={{ width:'50%', color: COLORS.black, fontSize: 18}}>
                    Sexo: {historiaEncontrada.sexo} 
                  </Text>
                </View>
                <Text style={{ width:'100%', color: COLORS.black, fontSize: 18, marginVertical: 10}}>
                    Fecha de Nacimiento: {historiaEncontrada.date} 
                </Text>
            </View>
            <Button
              title="Digitalizar"
              onPress={async () => {
                takePicture();
              }}
            />
            <View>
                <View  style= {{ flexDirection: 'row', marginVertical: 10}}>
                    <View style={{width: '45%'}}>
                        <Input
                            onChangeText={(text) => handleOnchange(text, "fechaNacimiento")}
                            onFocus={() => handleError(null, "fechaNacimiento")}
                            iconName="calendar"
                            label="Fecha"
                            //placeholder="Enter your phone no"
                            error={errors.fechaNacimiento}
                        />
                    </View>
                    <View style= {{width: '25%', marginHorizontal: 10, marginTop: 10}}>
                        <Button title="FILTRAR" onPress={async () => {filtrarConsulta();}} />
                    </View>
                    <View style= {{width: '25%', marginHorizontal: 10, marginTop: 10}}>
                        <Button title="ÚLTIMAS CONSULTAS" />
                    </View>
                </View>
            </View>
            { arregloRecibido? 
              <View style={{flex: 0, alignItems: 'center',backgroundColor: COLORS.light}}>
                {arregloRecibido.map((item, key) => (
                  <View style={{width: '90%', backgroundColor: COLORS.white,
                  borderColor: COLORS.darkBlue,
                  borderWidth: 1, padding: 10, marginVertical: 10, flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{width:'25%'}}>{item.fecha_atencion}</Text>
                    <Text style={{width:'45%'}}>Consulta Atencion</Text>
                    <ButtonIcon style={{width:'15%'}}  onPress={async () => {editarConsulta();}} iconName="pencil" />
                    <ButtonIcon style={{width:'15%'}}  onPress={async () => {visualizarConsulta(item);}} iconName="eye" />
                  </View>
                  )) 
                }
              </View> :
              <View>

              </View>
            }


        </ScrollView>
        </SafeAreaView>
    </View>
  );
};

export default HistoriaClinica;
