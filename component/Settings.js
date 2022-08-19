import React from "react";
import {Button, SafeAreaView, } from 'react-native'
import * as SecureStore from 'expo-secure-store'; // шифрование

import {AuthContext} from "../context/context";
import { gStyle } from "../constant/style";

export default function Settings() {

    const {signOut} = React.useContext(AuthContext)

    async function clearToken() {
        SecureStore.deleteItemAsync('secure_token');
        signOut()
    }

    return (
        <SafeAreaView style={gStyle.container}>
            <Button
                title={'Test'}
                style={gStyle.input}
                // onPress={checkNews}
            />
            <Button
                title={'Logout'}
                style={gStyle.input}
                onPress={clearToken}
            />
             
        </SafeAreaView>
    )
}

