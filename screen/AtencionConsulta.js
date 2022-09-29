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

import { agregarConsulta } from "../services/historiaClinicaService";
import COLORS from "../components/Colors";
import Button from "../components/Button";
import Input from "../components/Input";
import InputSec from "../components/InputSec";
import _Appbar from "../components/Appbar";
import Constants from 'expo-constants'
import { getResultado } from "../services/historiaClinicaService";
import TextArea from "../components/TextArea";
import ButtonCancelar from "../components/ButtonCancelar";

const AtencionConsulta = ({ navigation, route }) => {


  React.useEffect(() => {
           getConsulta();              
  }, []);

  const getConsulta = () => {
        if(route.params.item == undefined) {
                setTimeout(async () => {
                        try {
                           const consultaData = await getResultado();
              
                           // Primeros imputs
                           setInputs_pri({
                              fecha_atencion: consultaData.Fec_Atencion,
                              hora: consultaData.Hora,
                              edad: consultaData.Edad
                            })
                            // Segundos inputs
                            setInputs_seg({
                              motivo: consultaData.Motivo,
                              tiempo_enf: consultaData.Tipo_Enf,
                              signos_sin: consultaData.Signos_Sintomas
                            })
                            // Tercer
                            setInputs_ter({
                              temp: consultaData.Temperatura,
                              presion: consultaData.Pa,
                              frecuencia_card: consultaData.Fc,
                              frecuencia_resp: consultaData.Fr,
                              peso: consultaData.Peso,
                              talla: consultaData.Talla,
                              pabd: consultaData.Imc
                            })
                            // Cuarto
                            setInputs_cua({
                              apetito: consultaData.Apetito,
                              estado: consultaData.Estado_Animo,
                              sed: consultaData.Sed,
                              orina: consultaData.Orina,
                              suenio: consultaData.Suenio,
                              deposiciones: consultaData.Deposiciones
                            })
                            // Quinto
                            setInputs_quin({
                              diagnostico: consultaData.Diagnostico,
                              exa_auxiliares: consultaData.Examenes_Auxiliares,
                              prox_cita: consultaData.Proxima_Cita,
                              observacion: consultaData.Observaciones,
                              //atendido: consultaData.Atendido_Por,
                              tratamiento: consultaData.Tratamiento
                            })
                        }  catch (error) {
                          Alert.alert("Error", "Something went wrong aqui");
                        }
                      })
        } else {
                setInputs_pri({
                        fecha_atencion: route.params.item.fecha_atencion,
                        hora:  route.params.item.hora,
                        edad: route.params.item.edad
                      })
                      // Segundos inputs
                      setInputs_seg({
                        motivo: route.params.item.detalle_consulta.motivo_consulta,
                        tiempo_enf: route.params.item.detalle_consulta.tiempo_enfermedad,
                        signos_sin: route.params.item.detalle_consulta.Signos_sintomas
                      })
                      // Tercer
                      setInputs_ter({
                        temp: route.params.item.signos_vitales.temperatura,
                        presion: route.params.item.signos_vitales.presion_arterial,
                        frecuencia_card: route.params.item.signos_vitales.frecuencia_cardiaca,
                        frecuencia_resp: route.params.item.signos_vitales.frecuencia_respiratoria,
                        peso: route.params.item.datos_antropometricos.peso,
                        talla: route.params.item.datos_antropometricos.talla,
                        pabd: route.params.item.signos_vitales.presion_arterial
                      })
                      // Cuarto
                      setInputs_cua({
                        apetito: route.params.item.funciones_biologicas.apetito,
                        estado: route.params.item.funciones_biologicas.estado_animo,
                        sed: route.params.item.funciones_biologicas.sed,
                        orina: route.params.item.funciones_biologicas.orina,
                        suenio: route.params.item.funciones_biologicas.sueño,
                        deposiciones: route.params.item.funciones_biologicas.deposiciones
                      })
                      // Quinto
                      setInputs_quin({
                        diagnostico: route.params.item.diagnostico,
                        exa_auxiliares: route.params.item.examenes_auxiliares,
                        prox_cita: route.params.item.proxima_cita,
                        observacion: route.params.item.observaciones,
                        tratamiento: route.params.item.tratamiento
                      })  
        }

  }

  const [inputs_pri, setInputs_pri] = React.useState({
    fecha_atencion: "",
    hora: "",
    edad: ""
  });

  const [inputs_seg, setInputs_seg] = React.useState({
    motivo: "",
    tiempo_enf: "",
    signos_sin: ""
  });

  const [inputs_ter, setInputs_ter] = React.useState({
    temp: "",
    presion: "",
    frecuencia_card: "",
    frecuencia_resp: "",
    peso: "",
    talla: "",
    pabd: ""
  });

  const [inputs_cua, setInputs_cua] = React.useState({
    apetito: "",
    estado: "",
    sed: "",
    orina: "",
    suenio: "",
    deposiciones: ""
  });

  const [inputs_quin, setInputs_quin] = React.useState({
    diagnostico: "",
    exa_auxiliares: "",
    prox_cita: "",
    observacion: "",
    tratamiento: ""
  });

  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = () => {
        setTimeout(async () => {
                try {
                  const dataRecibida = await agregarConsulta(inputs_pri.fecha_atencion, inputs_pri.hora, inputs_pri.edad, inputs_seg.motivo, inputs_seg.tiempo_enf, inputs_seg.signos_sin, inputs_ter.temp, inputs_ter.presion, inputs_ter.frecuencia_card,
                        inputs_ter.frecuencia_resp, inputs_ter.peso, inputs_ter.talla, inputs_ter.pabd, inputs_cua.apetito, inputs_cua.estado, inputs_cua.sed, inputs_cua.orina, inputs_cua.suenio, inputs_cua.deposiciones,
                        inputs_quin.diagnostico, inputs_quin.exa_auxiliares, inputs_quin.prox_cita, inputs_quin.observacion, inputs_quin.tratamiento, route.params.numHistory);
                  setLoading(false);
          
                  if(dataRecibida.meesage == 'Registro de historia exitoso') {
                
                        Alert.alert("Historia Clínica Guardada", "La historia clínica del paciente se encuentra guardada bajo nuestro sistema de seguridad");
                        navigation.navigate("HistoriaClinica", { dni: route.params.dni, numHistory: route.params.numHistory})        
                  
                } else {
                    Alert.alert("Error", "Error al registrar historia");
                  }
                } catch (error) {
                  Alert.alert("Error", "Something went wrong", error);
                }
        })
  };

  const cancelar = () => {
         navigation.navigate("HistoriaClinica", { dni: route.params.dni, numHistory: route.params.numHistory})        
  };

  const handleOnchange_pri = (text, input) => {
    setInputs_pri((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleOnchange_seg = (text, input) => {
    setInputs_seg((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleOnchange_ter = (text, input) => {
    setInputs_ter((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleOnchange_cua = (text, input) => {
    setInputs_cua((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleOnchange_quin = (text, input) => {
    setInputs_quin((prevState) => ({ ...prevState, [input]: text }));
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
            ATENCIÓN CONSULTA
            </Text>
            <View style={{ marginVertical: 20,             
                // backgroundColor: COLORS.light,
                borderColor: COLORS.darkBlue,
                borderWidth: 2, padding: 10,flexDirection: 'row' }}>
                    <InputSec
                            editable={route.params.item == undefined}
                            onChangeText={(text) => handleOnchange_pri(text, "fecha_atencion")}
                            onFocus={() => handleError(null, "fecha_atencion")}
                            label="Fecha de Atención"
                            ancho= '40%'
                            paddRig= {30}
                            value= {inputs_pri?.fecha_atencion}
                            //placeholder="Enter your phone no"
                            error={errors.fecha_atencion}
                    />
                    <InputSec
                            editable={route.params.item == undefined}
                            onChangeText={(text) => handleOnchange_pri(text, "hora")}
                            onFocus={() => handleError(null, "hora")}
                            label="Hora"
                            ancho= '20%'
                            paddRig= {20}
                            value= {inputs_pri?.hora}
                            //placeholder="Enter your phone no"
                            error={errors.hora}
                    />
                    <InputSec
                            editable={route.params.item == undefined}
                            onChangeText={(text) => handleOnchange_pri(text, "edad")}
                            onFocus={() => handleError(null, "edad")}
                            label="Edad"
                            value= {inputs_pri?.edad}
                            ancho= '20%'
                            paddRig= {10}
                            //placeholder="Enter your phone no"
                            error={errors.edad}
                    />
            </View>
            <View style={{ marginVertical: 20,             
                // backgroundColor: COLORS.light,
                borderColor: COLORS.darkBlue,
                borderWidth: 2, padding: 10 }}>
                    <Text style={{ color: COLORS.black, fontSize: 20, textAlign: "center" }}>
                    Detalle Consulta
                    </Text>
                    <InputSec
                            onChangeText={(text) => handleOnchange_seg(text, "motivo")}
                            onFocus={() => handleError(null, "motivo")}
                            label="Motivo de Consulta"
                            textAlign="center"
                            ancho= '100%'
                            paddRig= {10}
                            value= {inputs_seg?.motivo}
                            
                            //placeholder="Enter your phone no"
                            error={errors.motivo}
                    />
                    <View style={{ flexDirection: 'row'}}>
                    <InputSec
                            onChangeText={(text) => handleOnchange_seg(text, "tiempo_enf")}
                            onFocus={() => handleError(null, "tiempo_enf")}
                            label="Tiempo de Enfermedad"
                            textAlign="center"
                            ancho= '100%'
                            paddRig= {20}
                            value= {inputs_seg?.tiempo_enf}

                            //placeholder="Enter your phone no"
                            error={errors.tiempo_enf}
                    />
                    
                    </View>

            </View>
            <View style={{ marginVertical: 20,             
                // backgroundColor: COLORS.light,
                borderColor: COLORS.darkBlue,
                borderWidth: 2, padding: 10 }}>
                    <Text style={{ color: COLORS.black, fontSize: 20, textAlign: "center" }}>
                    Signos Vitales
                    </Text>
                    <View style={{ flexDirection: 'row'}}>
                    <InputSec
                            onChangeText={(text) => handleOnchange_ter(text, "temp")}
                            onFocus={() => handleError(null, "temp")}
                            label="Temperatura"
                            textAlign="center"
                            ancho= '45%'
                            paddRig= {20}
                            value= {inputs_ter?.temp}
                            //placeholder="Enter your phone no"
                            error={errors.temp}
                    />
                    <InputSec
                            onChangeText={(text) => handleOnchange_ter(text, "presion")}
                            onFocus={() => handleError(null, "presion")}
                            label="Presión Arterial"
                            textAlign="center"
                            ancho= '45%'
                            paddRig= {5}
                            value= {inputs_ter?.presion}
                            //placeholder="Enter your phone no"
                            error={errors.presion}
                    />
                    </View>
                    <View style={{ flexDirection: 'row'}}>
                    <InputSec
                            onChangeText={(text) => handleOnchange_ter(text, "frecuencia_card")}
                            onFocus={() => handleError(null, "frecuencia_card")}
                            label="Frecuencia Cardiaca"
                            textAlign="center"
                            ancho= '45%'
                            paddRig= {20}
                            value= {inputs_ter?.frecuencia_card}

                            //placeholder="Enter your phone no"
                            error={errors.frecuencia_card}
                    />
                    <InputSec
                            onChangeText={(text) => handleOnchange_ter(text, "frecuencia_resp")}
                            onFocus={() => handleError(null, "frecuencia_resp")}
                            label="Frecuencia Resporatoria"
                            textAlign="center"
                            ancho= '45%'
                            paddRig= {5}
                            value= {inputs_ter?.frecuencia_resp}
                            //placeholder="Enter your phone no"
                            error={errors.frecuencia_resp}
                    />
                    </View>
                    <Text style={{ color: COLORS.black, fontSize: 20, textAlign: "center" }}>
                    Datos Antropométricos
                    </Text>
                    <View style={{ flexDirection: 'row'}}>
                    <InputSec
                            onChangeText={(text) => handleOnchange_ter(text, "peso")}
                            onFocus={() => handleError(null, "peso")}
                            label="Peso"
                            textAlign="center"
                            ancho= '30%'
                            value= {inputs_ter?.peso}
                            paddRig= {10}
                            //placeholder="Enter your phone no"
                            error={errors.peso}
                    />
                    <InputSec
                            onChangeText={(text) => handleOnchange_ter(text, "talla")}
                            onFocus={() => handleError(null, "talla")}
                            label="Talla"
                            textAlign="center"
                            ancho= '30%'
                            paddRig= {10}
                            value= {inputs_ter?.talla}
                            //placeholder="Enter your phone no"
                            error={errors.talla}
                    />
                    <InputSec
                            onChangeText={(text) => handleOnchange_ter(text, "pabd")}
                            onFocus={() => handleError(null, "pabd")}
                            label="IMC"
                            textAlign="center"
                            ancho= '30%'
                            paddRig= {10}
                            value= {inputs_ter?.pabd}
                            //placeholder="Enter your phone no"
                            error={errors.pabd}
                    />
                    </View>
                    
            </View>
            <View style={{ marginVertical: 20,             
                // backgroundColor: COLORS.light,
                borderColor: COLORS.darkBlue,
                borderWidth: 2, padding: 10 }}>
                    <Text style={{ color: COLORS.black, fontSize: 20, textAlign: "center" }}>
                    Funciones Biológicas
                    </Text>
                    <View style={{ flexDirection: 'row'}}>
                    <InputSec
                            onChangeText={(text) => handleOnchange_cua(text, "apetito")}
                            onFocus={() => handleError(null, "apetito")}
                            label="Apetito"
                            textAlign="center"
                            ancho= '45%'
                            paddRig= {20}
                            value= {inputs_cua?.apetito}
                            //placeholder="Enter your phone no"
                            error={errors.apetito}
                    />
                    <InputSec
                            onChangeText={(text) => handleOnchange_cua(text, "estado")}
                            onFocus={() => handleError(null, "estado")}
                            label="Estado de ánimo"
                            textAlign="center"
                            ancho= '45%'
                            paddRig= {5}
                            value= {inputs_cua?.estado}
                            //placeholder="Enter your phone no"
                            error={errors.estado}
                    />
                    </View>
                    <View style={{ flexDirection: 'row'}}>
                    <InputSec
                            onChangeText={(text) => handleOnchange_cua(text, "sed")}
                            onFocus={() => handleError(null, "sed")}
                            label="Sed"
                            textAlign="center"
                            ancho= '45%'
                            paddRig= {20}
                            value= {inputs_cua?.sed}
                            //placeholder="Enter your phone no"
                            error={errors.sed}
                    />
                    <InputSec
                            onChangeText={(text) => handleOnchange_cua(text, "orina")}
                            onFocus={() => handleError(null, "orina")}
                            label="Orina"
                            textAlign="center"
                            ancho= '45%'
                            paddRig= {5}
                            value= {inputs_cua?.orina}
                            //placeholder="Enter your phone no"
                            error={errors.orina}
                    />
                    </View>
                    <View style={{ flexDirection: 'row'}}>
                    <InputSec
                            onChangeText={(text) => handleOnchange_cua(text, "suenio")}
                            onFocus={() => handleError(null, "suenio")}
                            label="Sueño"
                            textAlign="center"
                            ancho= '45%'
                            paddRig= {20}
                            value= {inputs_cua?.suenio}
                            //placeholder="Enter your phone no"
                            error={errors.suenio}
                    />
                    <InputSec
                            onChangeText={(text) => handleOnchange_cua(text, "deposiciones")}
                            onFocus={() => handleError(null, "deposiciones")}
                            label="Deposiciones"
                            textAlign="center"
                            ancho= '45%'
                            paddRig= {5}
                            value= {inputs_cua?.deposiciones}
                            //placeholder="Enter your phone no"
                            error={errors.deposiciones}
                    />
                    </View> 
            </View>
            <View style={{ marginVertical: 20,             
                // backgroundColor: COLORS.light,
                borderColor: COLORS.darkBlue,
                borderWidth: 2, padding: 10 }}>
                    <TextArea
                            onChangeText={(text) => handleOnchange_quin(text, "diagnostico")}
                            onFocus={() => handleError(null, "diagnostico")}
                            label="Diagnóstico"
                            textAlign="center"
                            ancho= '100%'
                            alto= {100}
                            numeroLineas= {10}
                            paddRig= {20}
                            value= {inputs_quin?.diagnostico}
                            //placeholder="Enter your phone no"
                            error={errors.diagnostico}
                    />

                    <View style={{ flexDirection: 'row'}}>
                        <View style={{ width: '50%'}}>
                                <TextArea
                                onChangeText={(text) => handleOnchange_quin(text, "exa_auxiliares")}
                                onFocus={() => handleError(null, "exa_auxiliares")}
                                label="Exámenes Auxiliares"
                                textAlign="center"
                                ancho= '95%'
                                alto= {90}
                                numeroLineas= {30}
                                paddRig= {5}
                                value= {inputs_quin?.exa_auxiliares}
                                //placeholder="Enter your phone no"
                                error={errors.tratamiento}
                                />
                                <InputSec
                                onChangeText={(text) => handleOnchange_quin(text, "prox_cita")}
                                onFocus={() => handleError(null, "prox_cita")}
                                label="Proxima cita"
                                textAlign="center"
                                ancho= '95%'
                                paddRig= {20}
                                value= {inputs_quin?.prox_cita}
                                //placeholder="Enter your phone no"
                                error={errors.prox_cita}
                                />
                                <InputSec
                                onChangeText={(text) => handleOnchange_quin(text, "atendido")}
                                onFocus={() => handleError(null, "atendido")}
                                label="Atendido por"
                                textAlign="center"
                                ancho= '95%'
                                paddRig= {20}
                                value= {inputs_quin?.atendido}
                                //placeholder="Enter your phone no"
                                error={errors.atendido}
                                />
                                <InputSec
                                onChangeText={(text) => handleOnchange_quin(text, "observacion")}
                                onFocus={() => handleError(null, "observacion")}
                                label="Observacion"
                                textAlign="center"
                                ancho= '95%'
                                paddRig= {20}
                                value= {inputs_quin?.observacion}
                                //placeholder="Enter your phone no"
                                error={errors.prox_cita}
                                 />
                        </View>
                        <View style={{ width: '50%'}}>
                                <TextArea
                                onChangeText={(text) => handleOnchange_quin(text, "tratamiento")}
                                onFocus={() => handleError(null, "tratamiento")}
                                label="Tratamiento"
                                textAlign="center"
                                ancho= '100%'
                                alto= {405}//405 está completo
                                numeroLineas= {30}
                                paddRig= {5}
                                value= {inputs_quin?.tratamiento}
                                //placeholder="Enter your phone no"
                                error={errors.tratamiento}
                                />
                        </View>



                    </View>
            </View>
            <View style={{  flex: 0, alignItems: 'center', paddingBottom: 20}}>
                <View style={{width:'80%'}}>
                        {route.params.item == undefined? 
                        <Button title="REGISTRAR" onPress={validate} />:
                        <View></View>
                        }
                        
                        <ButtonCancelar title={route.params.item == undefined? "CANCELAR": "VOLVER" } onPress={cancelar} />
                </View>
            </View>


        </ScrollView>
        </SafeAreaView>
    </View>
  );
};

export default AtencionConsulta;
