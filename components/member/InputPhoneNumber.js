import React from "react";

import {View, Text, StyleSheet, TouchableOpacity} from "react-native";

import TextInputField from "../TextInputField";
import {themeColors} from "../../styles/variables";

import ArrowDown from "../../assets/icons/arrow-down.svg"

const InputPhoneNumber = ({mobileCarrier, setMobileCarrier, phoneNo, setPhoneNo}) => {
    return (
        
        <View style={stylesInputPhoneNo}>
            <Text style={stylesInputPhoneNo.title}>연락처</Text>
            <View style={stylesInputPhoneNo.content}>
                <TouchableOpacity style={stylesInputPhoneNo.content.mobileCarrier}>
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