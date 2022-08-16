import { StatusBar } from 'expo-status-bar';
import {ActivityIndicator, SafeAreaView} from 'react-native';
import React, {useEffect, useState, useMemo} from 'react';

// Импорт навигационного меню
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

// Импорт view
import Settings from './component/Settings';
import HomeWork from './component/HomeWork';
import Main from './component/Main';
import Login from './component/Login';

// импорт контекста аутентификации
import {AuthContext} from "./context/context";
// импорт шифрованного токена 
import * as SecureStore from 'expo-secure-store';

import { gStyle } from './constant/style'; 

const Drawer = createDrawerNavigator();

export default function App() {
  const [token, setToken] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const authContent = useMemo(() => ({
    signIn: () => {
        setIsLoading(false)
        setToken('')
    },
    signOut: () => {
        setIsLoading(false)
        setToken(null)
    }
  }), [])

  useEffect(() => {
    SecureStore.getItemAsync('secure_token').then((value)=>{
        if(value){
            setToken(value)
        }
    })
  })

  useEffect(() => {
    setTimeout(() => {
        setIsLoading(false)
    }, 800)
  }, [])

  if (isLoading) {
    
    return (
        <SafeAreaView style={gStyle.container}>
            <ActivityIndicator size='large' />
        </SafeAreaView>
    )
}

    
    return (
      <AuthContext.Provider value={authContent}>
        <NavigationContainer>
          <Drawer.Navigator>
          {token !== null ? (
            <>
              <Drawer.Screen name="Main" component={Main} />
              <Drawer.Screen name="HomeWork" component={HomeWork} />
              <Drawer.Screen name="Settings" component={Settings} />
            </>
              ) : (

                  <>
                  <Drawer.Screen name="Login" 
                  component={Login}  
                  options={{
                    headerShown: false,
                    swipeEnabled: false,
                  }}  />
                  </>
              )}
          </Drawer.Navigator>
          <StatusBar style='auto' />
        </NavigationContainer>
      </AuthContext.Provider>
    );
  };
