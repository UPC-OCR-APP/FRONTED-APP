import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import COLORS from '../components/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
const TextArea = ({
  label,
  error,
  password,
  ancho,
  alto,
  numeroLineas,
  paddRig,
  editable,
  onFocus = () => {},
  ...props
}) => {
  const [hidePassword, setHidePassword] = React.useState(password);
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <View style={{marginBottom: 20, width: ancho, marginRight: paddRig }}>
      <Text style={style.label}>{label}</Text>
      <View
        style={[
          style.inputContainer,
          {
            height: alto,
            backgroundColor: COLORS.light,
            borderColor: error
              ? COLORS.red
              : COLORS.darkBlue,
            borderWidth: 2,
            alignItems: 'center',
          },
        ]}>
        <TextInput
        editable={editable}
        multiline
        numberOfLines={10}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          style={{color: COLORS.black, flex: 1}}
          {...props}
        />

      </View>
      {error && (
        <Text style={{marginTop: 7, color: COLORS.red, fontSize: 12}}>
          {error}
        </Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: COLORS.grey,
  },
  inputContainer: {
    backgroundColor: COLORS.light,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 0.5,
  },
});

export default TextArea;