import React from "react";

import {View, Text, StyleSheet} from "react-native";

import TextInputField from "../TextInputField";
import {themeColors} from "../../styles/variables";

const InputPassword = ({mobileCarrier, phoneNo, password, setPassword, rePassword, setRePassword, }) => {
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
                        <Text>{"인증완료"}</Text>
                    </View>
                </View>
            </View>

            <View style={stylesInputPassword}>
                <Text style={stylesInputPassword.title}>비밀번호 설정</Text>
                <View style={stylesInputPassword.content}>
                <View style={stylesInputPassword.content.textArea}>
                <TextInputField
                        value={password}
                        onValueChanged={(valueText) => setPassword(valueText)}
                        style={{}}
                        placeholder={"문자, 숫자, 특수문자 6자리 이상"}
                        isPassword={true}
                        maxLength={20}/>
                        <Text>{"보안인증"}</Text>
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