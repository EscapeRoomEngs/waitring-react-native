import React from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

import ArrowBack from "../../assets/icons/arrow-back.svg";
import Favorite from "../../assets/icons/favorite.svg";
import StoreMainImage from "../../assets/images/store-main-1.jpeg";
import WaitringFormButton from "../../assets/icons/waitring-form-button.svg";
import { themeColors } from "../../styles/variables";

const StoreDetail = () => {
	const keywords = ["음식이 맛있어요 👍", "분위기가 좋아요🍷", "+2"];
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
							오늘도 브런치
						</Text>
						<Favorite style={stylesStoreArea.icon} />
					</View>
					<Text style={stylesStoreArea.storeHeaderCaption}>
						서울특별시 송파구 올림픽로 269(롯데캐슬) 301호
					</Text>
					<View style={stylesStoreArea.keywordArea}>
						{keywords.map((keyword, idx) => (
							<Text key={idx} style={stylesStoreArea.keywordItem}>
								{keyword}
							</Text>
						))}
					</View>
				</View>
				<ScrollView style={stylesStoreArea.storeImageArea}>
					<View style={stylesStoreArea.storeImageArea.imageContainer}>
						<Image
							source={StoreMainImage}
							style={stylesStoreArea.storeImageArea.imageItem}
						/>
						<Image
							source={StoreMainImage}
							style={stylesStoreArea.storeImageArea.imageItem}
						/>
						<Image
							source={StoreMainImage}
							style={stylesStoreArea.storeImageArea.imageItem}
						/>
					</View>
				</ScrollView>
			</View>
			<View style={stylesSeperator} />
			<View style={stylesReviewArea}>
				<Text style={stylesReviewArea.title}>최근 작성된 리뷰</Text>
				{/* TODO: 리뷰 데이터 연결 */}
			</View>
			<View style={[stylesButtonBottom, stylesButtonBottom.orange]}>
				<WaitringFormButton style={stylesButtonBottom.icon} />
				<Text style={stylesButtonBottom.orange.text}>웨이링 하기</Text>
			</View>
		</SafeAreaView>
	);
};

export default StoreDetail;

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
	keywordArea: {
		flexDirection: "row",
		gap: 4,
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
const stylesSeperator = StyleSheet.create({
	height: 8,
	backgroundColor: "#F8F8F8",
	borderTopColor: themeColors.gray300 || "#E7E7E7",
	borderTopWidth: 1,
});
const stylesReviewArea = StyleSheet.create({
	paddingVertical: 40,
	gap: 16,
	title: { fontSize: 18, fontWeight: "700", paddingHorizontal: 24 },
	reviewItem: {
		paddingVertical: 16,
		paddingHorizontal: 24,
		profileArea: {},
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
	icon: {
		width: 24,
		aspectRatio: 1,
	},
	orange: {
		backgroundColor: themeColors.orange500,
		text: { fontSize: 18, fontWeight: "700", color: "white" },
	},
});
