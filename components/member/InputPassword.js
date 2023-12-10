import React, {useState, useEffect} from "react";

import {View, Text, StyleSheet} from "react-native";

import TextInputField from "../TextInputField";
import {themeColors} from "../../styles/variables";

import IconVerificationCompleted from "../../assets/icons/verification-completed.svg"
import IconLockClose0 from "../../assets/icons/lock-closed-0.svg"
import IconLockClose1 from "../../assets/icons/lock-closed-1.svg"
import IconLockClose2 from "../../assets/icons/lock-closed-2.svg"
import IconLockClose3 from "../../assets/icons/lock-closed-3.svg"

import {checkPw} from "../../utils/Utils.js"

const InputPassword = ({mobileCarrier, phoneNo, password, setPassword, rePassword, setRePassword, securityPw, setSecurityPw}) => {

    const [securityText, setSecurityText] = useState("보안없음")

    useEffect(() => {
        if(securityPw == 1) {setSecurityText("보안낮음")}
        else if(securityPw == 2) {setSecurityText("보안중간")}
        else if(securityPw == 3) {setSecurityText("보안높음")}
        else {setSecurityText("설정불가")}
        /*switch(securityPw) {
            case 1 : {setSecurityText("보안낮음")}
            case 2 : {setSecurityText("보안중간")}
            case 3 : {setSecurityText("보안높음")}
            default : {setSecurityText("설정불가")}
        }*/
    },[securityPw])

    return (
        <View style={{gap: 32}}>
            <View style={stylesInputPassword}>
                <Text style={stylesInputPassword.title}>연락처</Text>
                <View style={stylesInputPassword.content}>
                    <View style={stylesInputPassword.content.textArea}>
                        <View
                            style={{
                                gap: 8,
                                flexDirection: "row"
                            }}>
                            <Text>{mobileCarrier}</Text>
                            <Text>{phoneNo}</Text>
                        </View>
                        <View style={{flexDirection: "row", gap:2, alignItems: "center"}}>
                            {  <IconVerificationCompleted />}
                            <Text>{"인증완료"}</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={stylesInputPassword}>
                <Text style={stylesInputPassword.title}>비밀번호 설정</Text>
                <View style={stylesInputPassword.content}>
                <View style={stylesInputPassword.content.textArea}>
                <TextInputField
                        value={password}
                        onValueChanged={(valueText) => {setPassword(valueText); setSecurityPw(checkPw(valueText))} }
                        style={{flex: 1,
                            flexDirection: "row",
                            alignItems: "center",}}
                        placeholder={"문자, 숫자, 특수문자 6자리 이상"}
                        isPassword={true}
                        maxLength={20}/>
                        <View style={{flexDirection: "row", gap:2, alignItems: "center"}}>
                            {securityPw == 0 && <IconLockClose0 />}
                            {securityPw == 1 && <IconLockClose1 />}
                            {securityPw == 2 && <IconLockClose2 />}
                            {securityPw == 3 && <IconLockClose3 />}
                            <Text>{securityText}</Text>
                        </View>
                </View>
                

                </View>
            </View>

            <View style={stylesInputPassword}>
                <Text style={stylesInputPassword.title}>비밀번호 확인</Text>
                <View style={stylesInputPassword.content}>
                    <TextInputField
                        value={rePassword}
                        onValueChanged={(valueText) => setRePassword(valueText)}
                        style={stylesInputPassword.content.textArea}
                        placeholder={"비밀번호 재입력"}
                        isPassword={true}
                        maxLength={20}/>
                </View>
            {password != rePassword && <Text>{"비밀번호가 일치하지 않습니다."}</Text>}
            </View>

        </View>
    )
}

export default InputPassword;

/**
 * style
 */
const stylesInputPassword = StyleSheet.create({
    gap: 8,
    title: {
        color: themeColors.gray900 || "#191919",
        fontSize: 14,
        fontWeight: "normal"
    },
    content: {
        flexDirection: "row",
        textArea: {
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            gap:8,
            justifyContent: "space-between",
            paddingVertical: 10,
            paddingHorizontal: 8,
            borderBottomColor: themeColors.borderBottom,
            borderBottomWidth: 1
        }
    },
    bottom: {
        color: themeColors.gray600,
        paddingVertical: 8
    }
});