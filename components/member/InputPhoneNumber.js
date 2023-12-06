import React from "react";

import {View, Text, StyleSheet} from "react-native";

import TextInputField from "../TextInputField";
import {themeColors} from "../../styles/variables";

const InputPhoneNumber = ({phoneNo, setPhoneNo}) => {
    return (
        
        <View style={stylesInputPhoneNo}>
            <Text style={stylesInputPhoneNo.title}>연락처</Text>
            <View style={stylesInputPhoneNo.content}>
                <TextInputField
                    style={stylesInputPhoneNo.content.mobileCarrier}
                    placeholder="todo"/>
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
            alignSelf: 'stretch',
            width: 96,
            paddingVertical: 10,
            paddingHorizontal: 8,
            borderBottomColor: themeColors.borderBottom,
            borderBottomWidth: 1
        }
    }
});