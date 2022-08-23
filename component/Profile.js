import React, { useState,useEffect} from "react";
import { Text,SafeAreaView,ActivityIndicator, Image,View, Button } from "react-native";
import { getInfoStudent } from "../requestAPI/API";
import { gStyle } from "../constant/style";

export default function Profile () {
    
    const [isLoading, setIsLoading] = useState(true)
    const [aboutUser, setAboutUser] = useState([])

    useEffect(() => {
        getInfoStudent().then(value =>{
            // value.photoLink = '/photo/73988.jpg' // TEST
            setAboutUser(value)
        })
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
    
    return(
        <SafeAreaView>
            <View style={gStyle.cardFirstInfo}>
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
                            
                        </View>
                    </View>
            </View>
            
                <Text>{aboutUser.email}</Text>
                <Text>{aboutUser.birthday}</Text>
                <Text>{aboutUser.group.item1}</Text>
                <Text>{aboutUser.facul.faculName}</Text>
                <Text>{aboutUser.birthday}</Text>
                <Text>{aboutUser.email}</Text>
                <Text>{aboutUser.numberMobile}</Text>
                <Text>{aboutUser.admissionYear}</Text>
        </SafeAreaView>
    )
}   



