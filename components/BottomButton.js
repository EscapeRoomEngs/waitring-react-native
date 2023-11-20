import React from "react";

import {
    Platform,
    StyleSheet,
    Text,
    Image,
    Icon,
    TouchableOpacity
  } from "react-native";

import WaitringFormButton from '../assets/icons/waitring-form-button.svg';
import { themeColors } from "../styles/variables";

const BottomButton = ({name, onClick, disabled, icon}) => {

    return (
        <TouchableOpacity 
            activeOpacity={0.7}
            style={[stylesButtonBottom, stylesButtonBottom.orange]}
            disabled={disabled}
            onPress={onClick}>
            
            <Image source={icon} style={icon != null ? stylesButtonBottom.icon : null}/>
			<Text style={stylesButtonBottom.orange.text}>{name}</Text>
        </TouchableOpacity>
    )

}

BottomButton.defaultProps = {
    disabled : true,
    icon : null
}

export default BottomButton;

const stylesButtonBottom = StyleSheet.create({
	position: "absolute",
	bottom: 0,
	right: 0,
	left: 0,
	gap: 8,
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "center",
	paddingTop: 20,
	paddingBottom: Platform.OS === "ios" ? 36 : 20,
	icon: {
		width: 24,
        resizeMode: 'contain',
		aspectRatio: 1
	},
	orange: {
		backgroundColor: themeColors.orange500,
		text: { fontSize: 18, fontWeight: "700", color: "white" },
	},
});