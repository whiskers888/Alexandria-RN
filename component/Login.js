import React, {useState} from 'react';
import { View, KeyboardAvoidingView,SafeAreaView, TextInput, Image, Platform, TouchableWithoutFeedback, Button,Pressable,Text, Keyboard, Alert  } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { gStyle } from '../constant/style';
import { FontAwesome } from '@expo/vector-icons';

// импорт контекста аутентификации
import {AuthContext} from "../context/context";
import useToken from '../requestAPI/API';


export default function Login () {

  const [username, setUsername] = useState('')
  const [pass, setPass] = useState('')

  const { signIn } = React.useContext(AuthContext)
  
  function submitHandler(){
    if (username !== '' && pass !== ''){
      useToken(username,pass).then(result=>{
        if (result = 'OK'){
          signIn()
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