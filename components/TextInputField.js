import React, {useState} from "react";

import { StyleSheet,TextInput } from "react-native";

import { themeColors } from "../styles/variables";

const TextInputField = ({ keyboardType, placeholder, isPassword }) => {

	const [isShownPassword, setShownPassword] = useState(false);

	return (
		<TextInput style={stylesTextInputField}
		
		keyboardType={keyboardType}
		placeholder={placeholder}/>
	);
};

TextInputField.defaultProps = {
	isPassword : false
};

export default TextInputField;

const stylesTextInputField = StyleSheet.create({
	alignSelf: 'stretch',
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    color: themeColors.borderBottom || "#AFAFAF",
    borderBottomWidth: 1
});
