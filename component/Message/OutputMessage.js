import React, { useState,useEffect} from "react"
import { Text,SafeAreaView,ActivityIndicator,FlatList,View, Image } from "react-native";
import { getOutMailFromServer } from "../../requestAPI/API";
import { gStyle } from "../../constant/style";

export default function OutputMessage () {
    const [isLoading, setIsLoading] = useState(true)
    const [outputMessage, setOutputMessage] = useState([])

    function getOutMail(){
        getOutMailFromServer().then(value =>{
            setOutputMessage(value)
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

    const renderItem = ({item}) =>{
        const dateMessage = new Date(item.message.dispatchDate)
        const monthNames = ["янв", "фев", "марта", "апр", "мая", "июня",
        "июля", "авг", "сен", "окт", "нов", "дек"
        ];
        const viewDate = <Text style = {gStyle.notificationTime}>{dateMessage.getDate()} {monthNames[dateMessage.getMonth()]}.</Text>
        return(
            <View style ={gStyle.cardMsg}>
                 {item.message.userID === null
                            ? <Image style = {gStyle.avatarMsg} source = {{uri:'https://stud.sssu.ru/Images/man.png'}} />
                            : <Image style = {gStyle.avatarMsg} source = {{uri:`https://stud.sssu.ru/photo/`+(item.recipientID*(-1))+'.jpg'}}/>
                        }
                <View>
                    <View style ={gStyle.notificationItem}>   
                        <Text style = {gStyle.notificationName}>{item.userIdToMessage}</Text>
                        {viewDate}
                    </View>
                    {item.message.markdownMessage.length > 30
                    ?<Text>{item.message.markdownMessage.substring(0,30)}...</Text>
                    :<Text>{item.message.markdownMessage}</Text> 
                    }
                </View>
            </View>
            
        )
    }

    return(
        <SafeAreaView>
            <FlatList
            style={{width:'100%', height:'100%'}}
            data = {outputMessage}
            renderItem = {renderItem}
            onRefresh={getOutMail()}
            refreshing ={isLoading}
            />
        </SafeAreaView>
    )
}