import React, { useState } from 'react';
import { View, Image, TextInput, TouchableOpacity } from 'react-native';

const TextInputs = ({
  labelText,
  icon,
  style,
  state,
  setState,
  keyBoardType,
  secure,
  image,
  multiline,
  nbLines,
  disable,
  maxLength,
}) => {

  const [focuse, setFocuse] = useState(false);
  const [secureText, setSecureTextEntry] = useState(true);

  const onFocusChange = () => {
    setFocuse(true);
  };
  const onBlur = () => {
    setFocuse(false);
  };
  return (
    <View
      style={[
        {
          backgroundColor: '#F7F5F5',
          borderRadius: 5,
          height: multiline ? 100 : 50,
          width: '100%',
        },
        style,
      ]}>
      <View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        {!icon ? null : (
          <TouchableOpacity
            style={{
              position: 'absolute',
              left: 0,
              zIndex: 1,
            }}
            onPress={() => setSecureTextEntry(!secureText)}>
            <Image
              resizeMode="contain"
              source={image}

              style={{ width: 25, height: 25, tintColor: focuse ? "#048bf8" : "rgba(117, 117, 117, 1)", marginLeft: 5 }}
            />
          </TouchableOpacity>
        )}
        <TextInput
          onFocus={onFocusChange}
          onBlur={onBlur}
          keyboardType={keyBoardType}
          selectionColor="#048bf8"
          secureTextEntry={secure ? secureText : null}
          value={state}
          onChangeText={text => setState(text)}
          multiline={multiline}
          numberOfLines={nbLines}
          editable={disable}
          placeholder={labelText}
          maxLength={maxLength}
          placeholderTextColor={'#757575'}
          style={{
            // marginTop: multiline ? -10 : -11,
            marginLeft: 15,
            color: '#000' ,
            fontSize: 14,
            width: '100%',
            fontWeight: 'normal',
            fontFamily: 'Comfortaa-Bold',
            lineHeight: multiline ? 24 : 16,
            marginBottom: multiline ? 10 : 0
          }}
        />

        {image && (
          <TouchableOpacity
            onPress={() => {}}
            style={{
              position: 'absolute',
              right: 5,
              zIndex: 1,
              bottom: 15,
            }}>
            <Image
              resizeMode="contain"
              source={image}
              style={{ width: 20, height: 20, marginRight: 12 }}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default TextInputs