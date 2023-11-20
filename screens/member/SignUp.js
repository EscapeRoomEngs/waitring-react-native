import React from "react";
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput
} from "react-native";

import ArrowBack from "../../assets/icons/arrow-back.svg";
import { themeColors } from "../../styles/variables";

const SignUp = () => {
	
	return (
		<SafeAreaView
			style={{
				flex: 1,
				paddingTop: Platform.OS === "android" ? 20 : 0,
				backgroundColor: "#fff",
			}}>
			<View style={stylesHeaderNav.header}>
				<ArrowBack style={stylesHeaderNav.headerIcon} />
			</View>
			<View style={stylesStoreArea}>
				<View style={stylesStoreArea.storeHeader}>
					<View style={stylesStoreArea.storeHeader.addressArea}>
						<Text style={stylesStoreArea.storeHeader.addressArea.title}>
							휴대폰번호로{"\n"}간편하게 가입해요!
						</Text>
					</View>
					<Text style={stylesStoreArea.storeHeaderCaption}>
                    휴대폰 번호는 안전하게 보관되며 공개되지 않습니다.
					</Text>
				</View>
				<TextInput style={stylesStoreArea.phoneNumber}
                placeholder="전화번호를 입력해주세요">
            
                </TextInput>
			</View>
			
			<View style={[stylesButtonBottom, stylesButtonBottom.orange]}>
				<Text style={stylesButtonBottom.orange.text}>인증번호 받기</Text>
			</View>
		</SafeAreaView>
	);
};

export default SignUp;

const stylesHeaderNav = StyleSheet.create({
	header: {
		paddingTop: 16,
		paddingHorizontal: 24,
	},
	headerIcon: {
		width: 24,
		aspectRatio: 1,
	},
});
const stylesStoreArea = StyleSheet.create({
	paddingVertical: 40,
	gap: 40,
	storeHeader: {
		paddingHorizontal: 24,
		gap: 8,
		addressArea: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			icon: {
				width: 24,
				aspectRatio: 1,
			},
			title: {
				fontSize: 24,
				lineHeight: 28,
				fontWeight: "bold",
				color: themeColors.gray900 || "#191919",
			},
			caption: {
				color: themeColors.gray500 || "#888888",
				fontSize: 14,
				fontWeight: "normal",
			},
		},
	},
	
    phoneNumber : {
        alignSelf: 'stretch',
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderBottomColor: themeColors.orange500,
        margin:14,
        borderBottomWidth: 1 
    },

	keywordItem: {
		color: themeColors.gray700 || "#444444",
		fontSize: 12,
		lineHeight: 19,
		fontWeight: "normal",
		paddingVertical: 6,
		paddingHorizontal: 16,
		borderRadius: 20,
		borderColor: "#F2F2F2",
		borderWidth: 1,
	},
	storeImageArea: {
		overflowX: "scroll",
		flexDirection: "row",
		imageContainer: {
			overflowX: "scroll",
			flexDirection: "row",
			height: 150,
			gap: 8,
			marginHorizontal: 24,
		},
		imageItem: {
			width: 275,
			height: 150,
			borderRadius: 8,
			objectFit: true,
		},
	},
});

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
	orange: {
		backgroundColor: themeColors.orange500,
		text: { fontSize: 18, fontWeight: "700", color: "white" },
	},
});

