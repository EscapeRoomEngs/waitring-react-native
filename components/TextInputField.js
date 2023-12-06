import React, {useState} from "react";

import { StyleSheet,TextInput } from "react-native";

import { themeColors } from "../styles/variables";

const TextInputField = ({ value, onValueChanged, keyboardType, placeholder, isPassword, style, disabled, maxLength}) => {

	//const [isShownPassword, setShownPassword] = useState(false);
	
	return (
		<TextInput 
		value={value}
		style={style}
		secureTextEntry={isPassword}
		keyboardType={keyboardType}
		placeholder={placeholder}
		onChange={(event) => onValueChanged(event.nativeEvent.text)}
		disabled={disabled}
		maxLength={maxLength}
		/>
	);
};

TextInputField.defaultProps = {
	isPassword : false,
	disabled: false,
	style : {
		alignSelf: 'center',
    	flex: 1,
    	paddingVertical: 10,
    	paddingHorizontal: 8,
    	borderBottomColor: themeColors.borderBottom,
    	borderBottomWidth: 1
	}
};

export default TextInputField;
