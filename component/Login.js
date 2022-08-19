import React, {useState} from 'react';
import { View, KeyboardAvoidingView,SafeAreaView, TextInput, Image, Platform, TouchableWithoutFeedback, Button,Pressable,Text, Keyboard, Alert  } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { gStyle } from '../constant/style';
import { FontAwesome } from '@expo/vector-icons';

// импорт либы для работы с токеном
import * as SecureStore from 'expo-secure-store';
// импорт контекста аутентификации
import {AuthContext} from "../context/context";


export default function Login () {

  const [username, setUsername] = useState('')
  const [pass, setPass] = useState('')

  const { signIn } = React.useContext(AuthContext)
  
  const user = {
    'userName':username,
    'password':pass
}

  const storeToken  = async (token) => {
    try{
       await SecureStore.setItemAsync('secure_token', token);
    } catch (e) {
      console.log('cant save token' + e)
    }
  };

  async function clearToken() {
    SecureStore.deleteItemAsync('secure_token')
  }


  

  function submitHandler(){
    if (username !== '' && pass !== ''){
      let URL = 'https://test.mmis.ru/api/tokenauth'
      fetch(URL, {
          method:'POST',
          headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'userName':username,
            'password':pass
          })
      }).then(res => res.json()).then(res => {
        clearToken()
          if (res.data.accessToken !== null && res.state == '1') {
            storeToken(res.data.accessToken).then(() => {
                signIn()
            })
            console.log('GOT TOKEN')
          } else {
            Alert.alert('Ошибка','Введен неправильный логин или пароль')// return -1
            console.log('GOT ERROR OR EMPTY RESULT')
          }
          }
      )
    } else{
      Alert.alert('Внимание','Введите данные в поля для входа в приложение')
    }
};


  return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{flex:1}}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={gStyle.inner}>
          <View>
                  <Image source = {require('../assets/logo.png')} style = {gStyle.logo} />
                  <StatusBar style="auto" />
              </View>
              <View style = {{display:'flex'}}>
                  <View style={gStyle.authSection}>
                      <FontAwesome 
                          style={gStyle.searchIcon} 
                          name="user-circle" 
                          size={30} 
                          color="#4c85d4"/>
                      <TextInput
                          style={gStyle.input}
                          placeholder={"Введите логин"}
                          onChangeText={(username) => setUsername(username)}
                      />
                  </View>
                  
                  <View style={gStyle.authSection}>
                      <FontAwesome 
                      style={gStyle.searchIcon} 
                      name="lock" 
                      size={38} 
                      color="#4c85d4"/>
                      <TextInput
                      style={gStyle.input}
                      placeholder={"Введите пароль"}
                      secureTextEntry={true}
                      onChangeText={(pass) => setPass(pass)}
                      />
                  </View>
                  <Button style = {gStyle.btnSubmit} title='Login' onPress={submitHandler} />
              </View>
              
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
  );
};