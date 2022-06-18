import React, { useState } from 'react';
import { Text, StatusBar, View, Image, TextInput, TouchableOpacity } from 'react-native';
import images from '../constants/images';

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
          // backgroundColor: focuse
          //   ? 'rgba(36, 169, 223, 0.1)'
          //   : 'rgba(4, 45, 84, 0.05)',
          borderWidth: focuse ? 1 : 1,
          borderColor: focuse ? '#048bf8' : 'rgba(0, 0, 0, 0.12)',
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
          placeholderTextColor={'#757575'}
          style={{
            // marginTop: multiline ? -10 : -11,
            marginLeft: 30,
            color: '#000' ,
            fontSize: 14,
            width: '100%',
            fontWeight: 'normal',
            fontFamily: 'Comfortaa-Bold',
            lineHeight: multiline ? 24 : 16,
            marginBottom: multiline ? 10 : 0
          }}
        />

        {/* {image && (
          <TouchableOpacity
            onPress={() =>
              UseContext.setModalVisibilityDynamic('ChangePassword')
            }
            style={{
              position: 'absolute',
              right: 0,
              zIndex: 1,
              bottom: 20,
            }}>
            <Image
              resizeMode="contain"
              source={image}
              style={{ width: 20, height: 20, marginRight: 12 }}
            />
          </TouchableOpacity>
        )} */}
      </View>
    </View>
  )
}

export default TextInputs