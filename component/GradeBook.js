import React,{useEffect, useState} from "react";
import { Text,SafeAreaView, FlatList,View  } from "react-native";
import * as SecureStore from 'expo-secure-store'; // шифрование
import { gStyle } from "../constant/style";

import {getGradeBook} from '../requestAPI/API'

export default function GradeBook () {
    const [isLoading, setIsLoading] = useState(false)
    const [countThemCourse, setCountThemCourse] = useState(0)
    const [gradeBook, setGradeBook] = useState([ ])



    useEffect(() => {
            setIsLoading(true)
            getGradeBook().then(res =>{
                setCountThemCourse(res.data.groupedZachBook.length)
                setGradeBook(res.data.groupedZachBook )
            }).finally(()=>setIsLoading(false))
            console.log(countThemCourse)
        }, [])


    const markItem =({item})=>{

        return(
        <View style = {gStyle.itemMark}>
            <Text style = {{width:'80%'}} >{item.dis}</Text>
            <Text style = {{marginLeft:'auto'}}>{item.mark}</Text>
        </View>
            
        )
    }
    const groupRenderItem = ({item}) =>{
        for (let i = 0; i < countThemCourse ; i++) { 
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
        <SafeAreaView >
        {countThemCourse === 0 
        ?( <Text style = {{ fontSize:18, fontWeight:"bold", textAlign:'center', marginTop:"60%"}}> У вас еще нет оценок</Text>)
        :(<FlatList
            data = {gradeBook}
            renderItem = {groupRenderItem}
            onRefresh={getGradeBook}
            refreshing ={isLoading}
        />)
        }
            
        </SafeAreaView>
    )
}
