import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppBar, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {Image} from 'react-native';
import React from 'react';
import {SafeAreaView, Text, View, StyleSheet, TouchableNativeFeedback, TouchableOpacity} from 'react-native';
import COLORS from "../components/Colors";


const logoministerio = require('../assets/ministerio.png');

const DivTop = () => {
    return (
    <View style={{width: '100%', height:80,backgroundColor: COLORS.blue }}>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <Image style={{  width: 220,height: 50,marginTop: 15, marginRight: 10 }} source= {logoministerio}></Image> 
        </View>
      </View>
    )
}

export default DivTop;