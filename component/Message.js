import React,{useState} from "react"


import { Text,SafeAreaView,ActivityIndicator, Image,View, Modal, FlatList, StyleSheet, Pressable, Button} from "react-native";

import InputMessage from './Message/InputMessage'
import WriteMessage from "./Message/WriteMessage";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OutputMessage from "./Message/OutputMessage";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { gStyle } from "../constant/style";


export default function Message () {


    const Tab = createBottomTabNavigator();
    return(
            <Tab.Navigator 
            animationType = {'slide'}
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
    
                if (route.name === 'Входящие') {
                  iconName = focused
                    ? 'email-receive'
                    : 'email-receive-outline';
                } else if (route.name === 'Исходящие') {
                  iconName = focused ? 'email-send' : 'email-send';
                } else if(route.name === ' '){

                   return <MaterialCommunityIcons style = {{marginVertical:-12}}name="plus-circle" size={56} color="#1955a4" />
                }
    
                // You can return any component that you like here!
                return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: '#2483ff',
              tabBarInactiveTintColor: 'gray',
            })}>
                <Tab.Screen name="Входящие" component={InputMessage} options={{ headerShown: false}} />
                <Tab.Screen name=" " component={WriteMessage}  options={{ headerShown: false }} />
                <Tab.Screen name="Исходящие" component={OutputMessage} options={{ headerShown: false}}/>
            </Tab.Navigator>



    )
}

