import React from 'react';
import {TouchableOpacity, View, Text, TextInput, StyleSheet} from 'react-native';
import COLORS from './Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ButtonInput = ({onPress = () => {}, 
 label,
  iconName,
  error,
  valor,
...props}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        marginBottom: 20
      }}>
      <Text style={style.label}>{label}</Text>
      <View
        style={[
          style.inputContainer,
          {
            backgroundColor: COLORS.light,
            borderColor: error
              ? COLORS.red
              : COLORS.darkBlue,
            borderWidth: 2,
            
            alignItems: 'center',
          },
        ]}>
        <Icon
          name={iconName}
          style={{color: COLORS.darkBlue, fontSize: 22, marginRight: 10}}
        />
        <Text
          style={{color: COLORS.black, flex: 1}}
        >
          {valor}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: COLORS.grey,
  },
  inputContainer: {
    height: 55,
    backgroundColor: COLORS.light,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 0.5,
  },
});

export default ButtonInput;