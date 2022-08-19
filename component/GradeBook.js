import React,{useEffect, useState} from "react";
import { Text,SafeAreaView, FlatList,View  } from "react-native";
import * as SecureStore from 'expo-secure-store'; // шифрование
import { gStyle } from "../constant/style";

export default function GradeBook () {
    const [isLoading, setIsLoading] = useState(false)
    const [token, setToken] = useState('')
    const [countThemCourse, setCountThemCourse] = useState(0)
    const [gradeBook, setGradeBook] = useState([ ])

     // Получение оценок
     const getGradeBook = () => {
        setIsLoading(true)
        let URL = 'https://test.mmis.ru/api/EducationalActivity/ZachBook?studentID=-5'
        fetch(URL, {
            headers: {
                'Cookie': 'authToken='+token
            }
        }).then(res => res.json()).then(res => {
            setCountThemCourse(res.data.groupedZachBook.length)
            setGradeBook(res.data.groupedZachBook )
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
            getGradeBook()
        }
    }, [token])


    const markItem =({item})=>{

        return(
        <View style = {gStyle.itemMark}>
            <Text style = {{width:'80%'}} >{item.dis}</Text>
            <Text style = {{marginLeft:'auto'}}>{item.mark}</Text>
        </View>
            
        )
    }
    const groupRenderItem = ({item}) =>{
        for (let i = 0; i < countThemCourse ; i++) { // выведет 0, затем 1, затем 2
            console.log(item.key)
            return (
            <View style = {gStyle.groupZachBook}>
                <View style ={gStyle.borderNameGroup}>
                    <Text  style = {gStyle.nameGroupZach}>{item.course}-й курс {item.sem}-й семестр {item.year} ({item.controlForm})</Text>
                </View>
                <FlatList
                data ={item.marks}
                renderItem = {markItem}
                />  
            </View>
                    
        )
          }
        }

    return(
        <SafeAreaView>
            <FlatList
                data = {gradeBook}
                renderItem = {groupRenderItem}
                onRefresh={getGradeBook}
                refreshing ={isLoading}
            />
        </SafeAreaView>
    )
}
