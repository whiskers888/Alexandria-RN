import React,{useEffect, useState} from "react";
import {View, Text,SafeAreaView, FlatList } from "react-native";

import * as SecureStore from 'expo-secure-store'; // шифрование
import { gStyle } from "../constant/style";
import { StyleSheet } from "react-native";

export default function Main () {
        
    const [isLoading, setIsLoading] = useState(false)
    const [token, setToken] = useState('')
    const [newsArray, setNewsArray] = useState([ ]) // Список новостей
    let count = 0 

    function checkNews(){
        let URL = 'https://test.mmis.ru/api/Feed/DateViewed'
        fetch(URL, {
            method:'POST',
            headers: {
                // Authorization:'Bearer ',
                Cookie: 'authToken='+token,
                Origin:'https://test.mmis.ru',
                Host:'test.mmis.ru'
            },
            body: JSON.stringify({
                'data':null,
                'msg':'Лента',
                'state':1
            })
        }).then(res => res.json()).then(res => {
            // console.log(res)
        })
    }

    // Получение новостей
    const getNews = () => {
        setIsLoading(true)
        let URL = 'https://test.mmis.ru/api/Feed?userID=-5'
        fetch(URL, {
            headers: {
                'Cookie': 'authToken='+token
            }
        }).then(res => res.json()).then(res => {
            // console.log(res.data.feed)
            setNewsArray(res.data.feed)
        }).finally(() => setIsLoading(false))
    }

    //Получаем ключ 
    useEffect(() => {
        SecureStore.getItemAsync('secure_token').then((value)=>{
            if(value){
                setToken(value)
            }
        })
    })

    useEffect(() => {
        if (token !== '') {
            getNews()
        }
    }, [token])

    let date = 0
    function dateComponent(item){
        let dateNews
        let itemDate =new Date( Date.parse(item.fullDate))
        let itemDay = itemDate.getDate()
        if(itemDay !== date ){
           date = itemDay 
           return dateNews = <Text style = {gStyle.groupTimeNotif}>{item.date}</Text>
        }else if(itemDay!==date){
            date=itemDay
            return dateNews = <Text style = {gStyle.groupTimeNotif}>Сегодня</Text>
        }else{
            return dateNews = <Text style = {{display:'none'}}></Text>
        }
    }
    
    function isNew(item){
        let status
        if (item.isNew){
           status = <View style = {gStyle.notificationIsNew}></View>
            checkNews()
        }
        return status
    }

    function setColorNotification(item){
        let color 
       
        if(item.category == 'Журналы'){
            color = StyleSheet.create({
                borderLeftColor:'#f44336',
            })    
        } else if( item.category == 'Справки'){
            color = StyleSheet.create({
                borderLeftColor:'#9c27b0',
            })  
        } else if( item.category == 'Уведомление'){
            color = StyleSheet.create({
                borderLeftColor:'#0CDD89',
            })  
        } else{
            color = StyleSheet.create({
                borderLeftColor:'#2196f3',
            })  
        }
        return StyleSheet.compose(gStyle.borderNotification,color)
    }
    
    const renderItem = ({item,index}) =>{
        const notificationStatus = isNew(item)
        const notificationDate = dateComponent(item)
        const styleBorder = setColorNotification(item)
        return (
        <>
        {notificationDate}
        <View style ={gStyle.notification}>
        {/* {borderNotification} */}
        <View style ={styleBorder} >
            <View style = {gStyle.notificationItem}>
                <Text style = {gStyle.notificationName} >{item.category}</Text>
                {notificationStatus}
                <Text style = {gStyle.notificationTime}>{item.time}</Text>
            </View>
                <Text style >{item.text}</Text>
        </View>
        </View>
        </>
        
    )}

    return(
        <SafeAreaView>
            <FlatList
                data = {newsArray}
                renderItem = {renderItem}
                onRefresh={getNews}
                refreshing ={isLoading}
            />
        </SafeAreaView>
    )
}

