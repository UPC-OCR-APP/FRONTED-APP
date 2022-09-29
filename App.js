import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './screen/Login';
import Registro from './screen/Registro';
import Inicio from './screen/Inicio';
import Terminos from './screen/TerminosCondiciones';
import RegistroHistoriaClinica from './screen/RegistroHistoriaClinica';
import BusquedaHistoriaClinica from './screen/BusquedaHistoriaClinica';
import HistoriaClinica from './screen/HistoriaClinica';
import AtencionConsulta from './screen/AtencionConsulta';
import ActualizarPerfil from './screen/ActualizarPerfil';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import Loader from './src/views/components/Loader';
import { LogBox } from 'react-native';
const Stack = createNativeStackNavigator();

const App = () => {
  const [initialRouteName, setInitialRouteName] = React.useState('');

  React.useEffect(() => {
    setTimeout(() => {
      authUser();
    }, 2000);
  }, []);

  LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications

  const authUser = async () => {
    try {
      let userData = await AsyncStorage.getItem('userData');
      if (userData) {
        userData = JSON.parse(userData);
        if (userData.loggedIn) {
          setInitialRouteName('Inicio');
        } else {
          setInitialRouteName('Login');
        }
      } else {
        setInitialRouteName('Registro');
      }
    } catch (error) {
      setInitialRouteName('Registro');
    }
  };

  return (
    <NavigationContainer>
      {
        <>
          <Stack.Navigator
            initialRouteName={initialRouteName}
            screenOptions={{headerShown: false}}>
            <Stack.Screen
              name="Registro"
              component={Registro}
            />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Inicio" component={Inicio} />
            <Stack.Screen name="ActualizarPerfil" component={ActualizarPerfil} />
            <Stack.Screen name="RegistroHistoriaClinica" component={RegistroHistoriaClinica} />
            <Stack.Screen name="BusquedaHistoriaClinica" component={BusquedaHistoriaClinica} />
            <Stack.Screen name="HistoriaClinica" component={HistoriaClinica} />
            <Stack.Screen name="AtencionConsulta" component={AtencionConsulta} />
            <Stack.Screen name="TerminosCondiciones" component={Terminos} />
          </Stack.Navigator>
        </>
      }
    </NavigationContainer>
  );
};

export default App;