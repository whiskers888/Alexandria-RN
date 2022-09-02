import React, { useEffect, useState } from "react";
import { Text,SafeAreaView,Modal,View, Button } from "react-native";
import { gStyle } from "../../constant/style";

export default function WriteMessage () {
    const [modalVisible, setModalVisible] = useState(false);

    return(
        <SafeAreaView>
            <View style ={gStyle.centeredModal}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => { setModalVisible(!modalVisible)}}
                >
                    <View style = {[gStyle.modalView, gStyle.shadow]}>
                        <Text>1111</Text>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    )
}

