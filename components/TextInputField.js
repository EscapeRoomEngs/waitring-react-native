import React, {useState} from "react";

import {TextInput, View, TouchableOpacity,Text} from "react-native";

import {themeColors} from "../styles/variables";

import IcPwVisible from "../assets/icons/password-visible.svg"
import IcPwInvisible from "../assets/icons/password-invisible.svg"

const TextInputField = ({
    value,
    onValueChanged,
    keyboardType,
    placeholder,
    isPassword,
    style,
    disabled,
    maxLength
}) => {

    const [isShownPassword, setShownPassword] = useState(true);

    return (
        <View style={style}>
            <TextInput
                value={value}
                style={{
                    flex: 1
                }}
                secureTextEntry={isPassword && isShownPassword}
                keyboardType={keyboardType}
                placeholder={placeholder}
                onChange={(event) => onValueChanged(event.nativeEvent.text)}
                disabled={disabled}
                maxLength={maxLength}/> 
				{ (isPassword && value.length > 0) &&
                <TouchableOpacity style={{width: 24, height: 24}}
					onPress={() => setShownPassword(!isShownPassword)}
				> 
					{isShownPassword ? <IcPwVisible/> : <IcPwInvisible/>}
						</TouchableOpacity>
            }

        </View>

    );
};

TextInputField.defaultProps = {
    isPassword: false,
    disabled: false,
    style: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 8,
        borderBottomColor: themeColors.borderBottom,
        borderBottomWidth: 1
    }
};

export default TextInputField;
