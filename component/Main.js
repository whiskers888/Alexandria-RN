import React,{useEffect, useState} from "react";
import { Text,SafeAreaView, FlatList } from "react-native";

import * as SecureStore from 'expo-secure-store'; // шифрование

export default function Main () {
        
    const [isLoading, setIsLoading] = useState(false)
    const [token, setToken] = useState('')
    const [newsArray, setNewsArray] = useState([ ])


    const getData = () => {
        setIsLoading(true)
        let URL = 'https://test.mmis.ru/api/Feed?userID=-5'
        fetch(URL, {
            headers: {
                'Cookie': 'authToken='+token
            }
        }).then(res => res.json()).then(res => {
            console.log(res.data.feed)
            setNewsArray(res.data.feed)
        }).finally(() => setIsLoading(false))
    }

    useEffect(() => {
        SecureStore.getItemAsync('secure_token').then((value)=>{
            if(value){
                setToken(value)
            }
        })
    })

    useEffect(() => {
        if (token !== '') {
            getData()
        }
    }, [token])

    const renderItem = ({item,index}) =>(
        <Text >{item.text}</Text>
    )

    return(
        <SafeAreaView>
            <FlatList
                data = {newsArray}
                renderItem = {renderItem}
            />
        </SafeAreaView>
    )
}

