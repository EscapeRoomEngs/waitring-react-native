import React,{ useState } from "react";

import {View, Text, StyleSheet, TouchableOpacity} from "react-native";

import TextInputField from "../TextInputField";
import {themeColors} from "../../styles/variables";

import ArrowDown from "../../assets/icons/arrow-down.svg"

import BottomSheet from "../BottomSheet";

const InputPhoneNumber = ({mobileCarrier, setMobileCarrier, phoneNo, setPhoneNo}) => {

    const [ modalVisible, setModalVisible ] = useState(false);


    const onClick = (title) => {
        setMobileCarrier(item.title)
        setModalVisible(false)
    }

    const modalList = [
        {title: "SKT"},
        {title: "KT"},
        {title: "LG U+"},
        {title: "SKT알뜰폰"},
        {title: "KT알뜰폰"},
        {title: "LG U+알뜰폰"},
    ].map((item, index) => 
    <TouchableOpacity 
        key={index}
        onPress={() =>
            {setMobileCarrier(item.title); setModalVisible(false)}
        }
        style={{paddingHorizontal: 8, paddingVertical: 20}}>
        <Text key={index} >{item.title}</Text> 
        </TouchableOpacity> );

    return (
        <View style={stylesInputPhoneNo}>
            <Text style={stylesInputPhoneNo.title}>연락처</Text>
            <View style={stylesInputPhoneNo.content}>
                <TouchableOpacity 
                onPress={() => {setModalVisible(true)}}
                style={stylesInputPhoneNo.content.mobileCarrier}>
                        { mobileCarrier != "" ? <Text>{mobileCarrier}</Text> : <Text style={{color: themeColors.borderBottom}}>{"통신사"}</Text>}
                        <ArrowDown width="20px" height="18px" resizeMode="contain"/>
                    </TouchableOpacity>
                <TextInputField
                    value={phoneNo}
                    onValueChanged={(valueText) => setPhoneNo(valueText)}
                    keyboardType="numeric"
                    maxLength={11}
                    placeholder="숫자만 입력(‘-’제외)"/>
            </View>

            <BottomSheet
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                title = "통신사 선택"
                children = {
                    modalList
                }
            />

        
        </View>
    )
}

export default InputPhoneNumber;

/**
 * style
 */
const stylesInputPhoneNo = StyleSheet.create({
    title: {
        color: themeColors.gray900 || "#191919",
        fontSize: 14,
        fontWeight: "normal"
    },
    content: {
        gap: 8,
        flexDirection: "row",
        mobileCarrier: {
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            width: 96,
            paddingVertical: 10,
            paddingHorizontal: 8,
            borderBottomColor: themeColors.borderBottom,
            borderBottomWidth: 1
        }
    }
});