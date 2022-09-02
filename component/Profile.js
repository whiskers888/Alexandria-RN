import React, { useState,useEffect} from "react";
import { Text,SafeAreaView,ActivityIndicator, Image,View, Modal, FlatList, StyleSheet, Pressable} from "react-native";
import { getInfoStudent,getNews,checkNews } from "../requestAPI/API";

import { gStyle } from "../constant/style";
// TODO: Реализовать checknews
export default function Profile () {
    
    const [isLoading, setIsLoading] = useState(true)
    const [aboutUser, setAboutUser] = useState([])

    const [newsArray, setNewsArray] = useState([ ]) // Список новостей
    const [modalVisible, setModalVisible] = useState(false);

    function getNewNews(){
        getNews().then( listNews =>{
            setNewsArray(listNews)
            console.log('Update News')
        })
    }

    useEffect(() => {
        getInfoStudent().then(value =>{
            // value.photoLink = '/photo/73988.jpg' // TEST
            setAboutUser(value)
        })
        getNewNews()
    },[])

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

  
    // Notification
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
    
    const renderItem = ({item}) =>{
        const notificationDate = dateComponent(item)
        const styleBorder = setColorNotification(item)
        return (
        <>
        {notificationDate}
        <View style ={gStyle.notification}>
        <View style ={styleBorder} >
            <View style = {gStyle.notificationItem}>
                {item.isNew ? <View style = {gStyle.notificationIsNew}></View> :<></>}
                <Text style = {gStyle.notificationName} >{item.category}</Text>
                <Text style = {gStyle.notificationTime}>{item.time}</Text>
            </View>
                <Text style >{item.text}</Text>
        </View>
        </View>
        </>
        
    )}
    
    return(
        <SafeAreaView>
            <View style={[gStyle.cardFirstInfo, gStyle.shadow]}>
                    <View style ={{display:"flex",flexDirection:'row',}}>
                        {aboutUser.photoLink === '/photo/'
                            ? <Image style = {gStyle.avatar} source = {{uri:'https://test.mmis.ru/Images/man.png'}} />
                            : <Image style = {gStyle.avatar} source = {{uri:`https://stud.sssu.ru`+aboutUser.photoLink}}/>
                        }
                        <View>
                            <Text style = {gStyle.nameUser}>{aboutUser.name} {aboutUser.middleName} </Text>
                            <Text>{aboutUser.course} курс {aboutUser.group.item1}</Text>
                            <Text style={{width:'90%'}}>Кафедра:{aboutUser.kaf.kafName}</Text>
                            <Text>{aboutUser.facul.faculName}</Text>
                            <Pressable style = {gStyle.btnMore} onPress={() => setModalVisible(true)}>
                                <Text style = {gStyle.btnMoreText}>Подробнее</Text>
                            </Pressable>
                        </View>
                    </View>
            </View>
            <View style ={gStyle.centeredModal}>
                <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => { setModalVisible(!modalVisible)}}
                >
                    <View style = {[gStyle.modalView, gStyle.shadow]}>
                        <Text>Email: {aboutUser.email}</Text>
                        <Text>День рождение: {aboutUser.birthday}</Text>
                        <Text>Группа: {aboutUser.group.item1}</Text>
                        <Text>Факультет: {aboutUser.facul.faculName}</Text>
                        <Text>Номер телефона:{aboutUser.numberMobile}</Text>
                        <Text>Год регистрации аккаунта: {aboutUser.admissionYear} г.</Text>
                        <Pressable style = {[gStyle.btnMore,gStyle.shadow]} title = 'Закрыть' onPress={()=> setModalVisible(!modalVisible)} >
                            <Text style = {gStyle.btnMoreText}> Закрыть</Text>
                        </Pressable>
                    </View>
                </Modal>
            </View>
            <Text style = {{fontWeight:'bold', fontSize:18, textAlign:'center', margin:4}}> Уведомления</Text>
            <FlatList
                data = {newsArray}
                renderItem = {renderItem}
                onRefresh={getNewNews}
                refreshing ={isLoading}
            />
        </SafeAreaView>
    )
}   



