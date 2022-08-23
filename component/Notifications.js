import React,{useEffect, useState} from "react";
import {View, Text,SafeAreaView, FlatList } from "react-native";

import { gStyle } from "../constant/style";
import { StyleSheet } from "react-native";

import {getNews,checkNews} from "../requestAPI/API"

export default function Notifications () {
        
    const [isLoading, setIsLoading] = useState(false)
    const [newsArray, setNewsArray] = useState([ ]) // Список новостей


    function getNewNews(){
        getNews().then( listNews =>{
            setNewsArray(listNews)
            console.log('Update News')
        })
    }

    useEffect(() => {
            setIsLoading(true)
            getNewNews()
            setIsLoading(false)
        },[])

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
                onRefresh={getNewNews}
                refreshing ={isLoading}
            />
        </SafeAreaView>
    )
}

