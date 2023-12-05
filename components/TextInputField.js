import React, {useState} from "react";

import { StyleSheet,TextInput } from "react-native";

import { themeColors } from "../styles/variables";

const TextInputField = ({ value, onValueChanged, keyboardType, placeholder, isPassword, style }) => {

	//const [isShownPassword, setShownPassword] = useState(false);
	
	return (
		<TextInput 
		value={value}
		style={style}
		secureTextEntry={isPassword}
		keyboardType={keyboardType}
		placeholder={placeholder}
		onChange={(event) => onValueChanged(event.nativeEvent.text)}
		/>
	);
};

TextInputField.defaultProps = {
	isPassword : false,
	style : {
		alignSelf: 'stretch',
    	flex: 1,
    	paddingVertical: 10,
    	paddingHorizontal: 8,
    	borderBottomColor: themeColors.borderBottom,
    	borderBottomWidth: 1
	}
};

export default TextInputField;
