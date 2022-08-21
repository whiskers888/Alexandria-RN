import React from "react";
import {Button, SafeAreaView, } from 'react-native'

import {AuthContext} from "../context/context";
import { gStyle } from "../constant/style";
import { clearToken } from "../requestAPI/getToken";

export default function Settings() {

    const {signOut} = React.useContext(AuthContext)

    async function exitApp() {
        clearToken().then(
            signOut()
        )
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
                onPress={exitApp}
            />
             
        </SafeAreaView>
    )
}

