import React from "react";
import { Button,SafeAreaView } from "react-native";

export default function Message () {
    
    function subDate(){
        let ns = Date.parse('2022-01-13T10:19:17.173')
        let ms = Date.parse('2022-01-12T10:19:17.173')
        console.log(ms +" "+ns)
    }

    return(
        <SafeAreaView>
            <Button title='Date' onPress={subDate}></Button>
        </SafeAreaView>
    )
}

