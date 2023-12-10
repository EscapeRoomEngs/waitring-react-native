import React, {useState} from "react";

import {View, Text, StyleSheet, TouchableOpacity} from "react-native";

import TextInputField from "../TextInputField";
import {themeColors} from "../../styles/variables";

import Timer from "../Timer";

const InputDigitCode = (
    {mobileCarrier, phoneNo, onCheckDigitCode, digitCode, setDigitCode}
) => {

    const defaultSecond = 180

    const [second, setSecond] = useState(defaultSecond);

    return (
        <View style={{
                gap: 24
            }}>
            <View style={stylesInputDigitCode}>
                <Text style={stylesInputDigitCode.title}>연락처</Text>
                <View style={stylesInputDigitCode.content}>
                    <View style={stylesInputDigitCode.content.textArea}>
                        <Text>{mobileCarrier}</Text>
                        <Text>{phoneNo}</Text>
                    </View>
                    <TouchableOpacity style={stylesInputDigitCode.content.button}
                        disabled= {second != 0}
                        onPress={()=> setSecond(defaultSecond)}
                        >
                        <Text>인증번호 재전송</Text>
                    </TouchableOpacity>
                </View>
                {second != 0 && <Text style={stylesInputDigitCode.bottom}>인증문자가 발송되었습니다.{"\n"}인증문자를 받지 못했을 경우 스팸함을 확인해주세요</Text>}
            </View>

            <View style={stylesInputDigitCode}>
                <Text style={stylesInputDigitCode.title}>인증번호</Text>
                <View style={stylesInputDigitCode.content}>
                    <View style={stylesInputDigitCode.content.textArea}>
                    <TextInputField
                        style={{flex:1}}
                        value={digitCode}
                        onValueChanged={(valueText) => setDigitCode(valueText)}
                        keyboardType="numeric"
                        placeholder={"숫자 6자리"}
                        maxLength={6}/>
                        <Timer second={second} setSecond={setSecond}/>
                    </View>
                    <TouchableOpacity
                        style={stylesInputDigitCode.content.button}
                        disabled={second == 0}
                        onPress={onCheckDigitCode}>
                        <Text>인증번호 확인</Text>
                    </TouchableOpacity>
                </View>
                {second == 0 && <Text style={stylesInputDigitCode.bottom}>인증 시간이 만료되었습니다. 재시도해주세요.</Text>}
            </View>

        </View>
    )
}

export default InputDigitCode;

/**
 * style
 */
const stylesInputDigitCode = StyleSheet.create({
    title: {
        color: themeColors.gray900 || "#191919",
        fontSize: 14,
        fontWeight: "normal"
    },
    content: {
        gap: 16,
        flexDirection: "row",
        textArea: {
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 10,
            paddingHorizontal: 8,
            borderBottomColor: themeColors.borderBottom,
            borderBottomWidth: 1,
            gap: 8
        },
        button: {
            width: 133,
            height: 44,
            color: themeColors.gray600,
            backgroundColor: 'white',
            borderWidth: 1,
            borderRadius: 8,
            borderColor: themeColors.borderBottom,
            alignItems: 'center',
            justifyContent: 'center'
        }
    },
    bottom: {
        color: themeColors.gray600,
        paddingVertical: 8
    }
});