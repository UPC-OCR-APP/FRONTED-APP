import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import COLORS from '../components/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ButtonIcon = ({iconName, onPress = () => {}}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        backgroundColor: COLORS.blue,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
      }}>
        <Icon
          name={iconName}
          style={{color: COLORS.white, fontSize: 30}}
        />
    </TouchableOpacity>
  );
};

export default ButtonIcon;