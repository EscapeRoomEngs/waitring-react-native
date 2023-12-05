import React from "react";

import { Platform, StyleSheet, Text, TouchableOpacity } from "react-native";

import WaitringFormButton from "../assets/icons/waitring-form-button.svg";
import { themeColors } from "../styles/variables";

const ButtonIcon = ({iconName = ""}) => {
	switch (iconName) {
		case "waitring":
			return <WaitringFormButton style={stylesButtonBottom.icon} />;
		// TODO: 기타 타입 추가
		case "":
		default:
			return;
	}
}

const BottomButton = ({ name, onClick, disabled, icon }) => {
	return (
		<TouchableOpacity
			activeOpacity={0.7}
			style={[stylesButtonBottom, disabled ? stylesButtonBottom.gray : stylesButtonBottom.orange]}
			disabled={disabled}
			onPress={onClick}>
			<ButtonIcon iconName={icon} />
			<Text style={stylesButtonBottom.orange.text}>{name}</Text>
		</TouchableOpacity>
	);
};

BottomButton.defaultProps = {
	disabled: false,
	icon: "",
};

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
		resizeMode: "contain",
		aspectRatio: 1,
	},
	gray: {
		backgroundColor: themeColors.borderBottom,
		text: { fontSize: 18, fontWeight: "700", color: "white" },
	},
	orange: {
		backgroundColor: themeColors.orange500,
		text: { fontSize: 18, fontWeight: "700", color: "white" },
	},
});
