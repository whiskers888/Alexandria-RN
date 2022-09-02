import React, { useState,useEffect} from "react"
import { Text,SafeAreaView,ActivityIndicator,FlatList,View, Image, Pressable, Modal, TouchableOpacity } from "react-native";
import { getInboxMail } from "../../requestAPI/API";
import { gStyle } from "../../constant/style";

export default function InputMessage () {
    const [isLoading, setIsLoading] = useState(true)
    const [inputMessage, setInputMessage] = useState([])

    const [modalVisible, setModalVisible] = useState(false);

    function getInputMail(){
        getInboxMail(0).then(value =>{
            setInputMessage(value)
        })
    }

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 100)
      }, [])



    if (isLoading) {
        return (
            <SafeAreaView style={gStyle.container}>
                <ActivityIndicator size='large' />
            </SafeAreaView>
        )
    }

    const renderItem = ({item,index}) =>{
        const dateMessage = new Date(item.message.dispatchDate)
        const monthNames = ["янв", "фев", "марта", "апр", "мая", "июня",
        "июля", "авг", "сен", "окт", "нов", "дек"
        ];
        const viewDate = <Text style = {gStyle.notificationTime}>{dateMessage.getDate()} {monthNames[dateMessage.getMonth()]}.</Text>
        return(
            <View >
                <TouchableOpacity style={gStyle.cardMsg} onPress={()=> setModalVisible(!modalVisible)}>
                    {item.message.userID === null
                                ? <Image style = {gStyle.avatarMsg} source = {{uri:'https://stud.sssu.ru/Images/man.png'}} />
                                : <Image style = {gStyle.avatarMsg} source = {{uri:`https://stud.sssu.ru/photo/`+(item.message.userID*(-1))+'.jpg'}}/>
                            }
                    <View>
                        <View style ={gStyle.notificationItem}>   
                            <Text style = {gStyle.notificationName}>{item.userIdFromMessage}</Text>
                            {viewDate}
                        </View>
                        {item.message.markdownMessage.length > 30
                        ?<Text>{item.message.markdownMessage.substring(0,30)}...</Text>
                        :<Text>{item.message.markdownMessage === null || '' ? 'Пустое сообщение' : item.message.markdownMessage}</Text> 
                        }
                    </View>    
                </TouchableOpacity>
                <View style ={gStyle.centeredModal} >
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => { setModalVisible(!modalVisible)}}
                        >
                            <View style = {[gStyle.modalView, gStyle.shadow]}>
                                <Text onPress={()=>setModalVisible(!modalVisible)} >Exit</Text>
                            </View>
                        </Modal>
                    </View>
            </View>
            
           
            
        )
    }

    return(
        <SafeAreaView>
            <FlatList
            style={{width:'100%', height:'100%'}}
            data = {inputMessage}
            renderItem = {renderItem}
            onRefresh={getInputMail()}
            refreshing ={isLoading}
            />
            
        </SafeAreaView>
    )
}