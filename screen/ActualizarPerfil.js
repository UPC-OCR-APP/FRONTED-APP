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
import { updateUser } from "../services/userService";
//import Loader from '../components/Loader';

const ActualizarPerfil = ({ navigation }) => {

    // const [inputs, setUserDetails] = React.useState();
    
    const [inputs, setInputs] = React.useState();

    React.useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
            setInputs(JSON.parse(userData));
        }
    };

    const [errors, setErrors] = React.useState({});
    const [loading, setLoading] = React.useState(false);
0
    const validate = () => {
        Keyboard.dismiss();
        let isValid = true;

        if (!inputs.nombre) {
            handleError("Ingresa tu nombre", "nombre");
            isValid = false;
        }

        if (!inputs.apellido) {
            handleError("Ingresa tu apellido", "apellido");
            isValid = false;
        }

        if (!inputs.dni) {
            handleError("Ingresa tu D.N.I.", "dni");
            isValid = false;
        } else if (inputs.dni.length != 8) {
            handleError("La longitud del D.N.I. es 8", "dni");
            isValid = false;
        }

        if (!inputs.correo) {
            handleError("Ingresa tu correo", "correo");
            isValid = false;
        } else if (!inputs.correo.match(/\S+@\S+\.\S+/)) {
            handleError("Ingresa un correo válido", "correo");
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
            actualizar();
        }
    };

    const actualizar = () => {
        //setLoading(true);
        setTimeout(async () => {
            try {
                const dataActualizada = await updateUser(inputs.nombre, inputs.apellido, inputs.correo, inputs.usuario, inputs.contraseña);
                setLoading(false);
                if(dataActualizada.message == 'registro') {
                    AsyncStorage.setItem("userData", JSON.stringify(inputs));
                    navigation.navigate("Inicio");
                }
                if(dataActualizada.message == 'usuario o correo en uso') {
                    Alert.alert("Error", "Usuario o correo en uso");
          
                }
                if(dataActualizada.message == 'faltan datos') {
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
        <View style={{marginTop: Constants.statusBarHeight, flexGrow:1, backgroundColor: COLORS.white}}>
            <_Appbar {...navigation}/>
            <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
                <ScrollView
                    contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}
                >
                    <Text style={{ color: COLORS.black, fontSize: 30, fontWeight: "bold", textAlign: 'center' }}>
                        ACTUALIZAR MI PERFIL
                    </Text>

                    <View style={{ marginVertical: 20 }}>
                        <Input
                            onChangeText={(text) => handleOnchange(text, "nombre")}
                            onFocus={() => handleError(null, "nombre")}
                            iconName="account-circle"
                            label="Nombres"
                            value= {inputs?.nombre}
                            //placeholder="Ingresa tus nombres"
                            error={errors.nombre}
                        />

                        <Input
                            onChangeText={(text) => handleOnchange(text, "apellido")}
                            onFocus={() => handleError(null, "apellido")}
                            iconName="account-circle"
                            label="Apellidos"
                            value= {inputs?.apellido}
                            //placeholder="Ingresa tus apellidos"
                            error={errors.apellido}
                        />

                        <Input
                            keyboardType="numeric"
                            onChangeText={(text) => handleOnchange(text, "dni")}
                            onFocus={() => handleError(null, "dni")}
                            iconName="card-account-details-outline"
                            label="DNI"
                            value= {inputs?.dni}
                            //placeholder="Enter your phone no"
                            error={errors.dni}
                        />
                        <Input
                            onChangeText={(text) => handleOnchange(text, "correo")}
                            onFocus={() => handleError(null, "correo")}
                            iconName="email-outline"
                            label="Correo"
                            value= {inputs?.correo}
                            //placeholder="Enter your phone no"
                            error={errors.correo}
                        />
                        <Input
                            onChangeText={(text) => handleOnchange(text, "usuario")}
                            onFocus={() => handleError(null, "usuario")}
                            iconName="account-box-outline"
                            label="Usuario"
                            value= {inputs?.usuario}
                            //placeholder="Enter your phone no"
                            error={errors.usuario}
                        />
                        <Input
                            onChangeText={(text) => handleOnchange(text, "contraseña")}
                            onFocus={() => handleError(null, "contraseña")}
                            iconName="lock-outline"
                            label="Contraseña"
                            value= {inputs?.contraseña}
                            //placeholder="Enter your password"
                            error={errors.contraseña}
                            password
                        />
                        <Button title="ACTUALIZAR DATOS" onPress={validate} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

export default ActualizarPerfil;
