import React from "react";
import { Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import ButtomBottom from "../../components/BottomButton";
import { ReviewItem } from "../../components/store/StoreDetailListItem";

import ArrowBack from "../../assets/icons/arrow-back.svg";
import Favorite from "../../assets/icons/favorite.svg";
import StoreMainImage from "../../assets/images/store-main-1.jpeg";
import ArrowDown from "../../assets/icons/arrow-down.svg";
import { themeColors } from "../../styles/variables";

const StoreDetail = () => {
	const keywords = ["음식이 맛있어요 👍", "분위기가 좋아요🍷", "+2"];
	const reviews = [
		{
			reviewer: "포실포실 카푸치노",
			content:
				"행궁동에 새로 생긴 카이센동 맛집이라고 해서 가봤는데 인테리어부터 너무 감각적이고 예뻤어요!! 맛나게 잘 먹고 갑니다",
			visitCnt: 1,
			liked: false,
		},
		{
			reviewer: "향기로운 바닐라라떼",
			content:
				"행궁동에 새로 생긴 카이센동 맛집이라고 해서 가봤는데 인테리어부터 너무 감각적이고 예뻤어요!! 맛나게 잘 먹고 갑니다",
			visitCnt: 10,
			liked: false,
		},
	];
	return (
		<SafeAreaView
			style={{
				flex: 1,
				paddingTop: Platform.OS === "android" ? 20 : 0,
				paddingBottom: Platform.OS === "android" ? 64 : 80,
				overflowY: "scroll",
				backgroundColor: "#fff",
			}}>
			<ScrollView>
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
					<ScrollView horizontal={true} style={stylesStoreArea.storeImageArea}>
						<View style={stylesStoreArea.storeImageArea.imageContainer}>
							{[StoreMainImage, StoreMainImage, StoreMainImage].map((src, sidx) => (
								<Image
									key={sidx}
									source={src}
									style={stylesStoreArea.storeImageArea.imageItem}
								/>
							))}
						</View>
					</ScrollView>
				</View>
				<View style={stylesSeperator} />
				{/* TODO: 탭 나누기 (리뷰, 상세정보)) */}
				<View style={stylesReviewArea}>
					<Text style={stylesReviewArea.title}>최근 작성된 리뷰</Text>
					<View style={stylesReviewArea.reviewList}>
						<View>
							{reviews.map((review, ridx) => (
								<ReviewItem
									key={ridx}
									review={review}
									stylesReviewArea={stylesReviewArea}
								/>
							))}
						</View>
						<LinearGradient
							colors={["rgba(256, 256, 256, 0.0)", "#FFF", "#FFF"]}
							style={stylesReviewArea.gradientBackground}>
							<View style={stylesReviewArea.buttonMore}>
								<Text>더보기</Text>
								<ArrowDown />
							</View>
						</LinearGradient>
					</View>
				</View>
			</ScrollView>
			<ButtomBottom name="웨이링 하기" icon="waitring" />
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
		overflowY: "hidden",
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
			// objectFit: true,
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
		flexDirection: "column",
		borderBottomColor: themeColors.gray300,
		borderBottomWidth: 1,
		gap: 16,
		profileArea: {
			flexDirection: "row",
			justifyContent: "space-between",
			left: {
				flexDirection: "row",
				alignItems: "center",
				gap: 8,
			},
			right: {
				flexDirection: "row",
				alignItems: "center",
				gap: 8,
			},
		},
		profile: {
			width: 36,
			aspectRatio: 1,
			borderRadius: "100%",
			backgroundColor: themeColors.gray300 || "#E7E7E7E",
		},
		name: {
			color: "#191919",
			fontSize: 14,
			fontWeight: 600,
		},
		visitCnt: {
			color: "#888",
			fontSize: 12,
			fontWeight: 400,
		},
		likedButton: {
			paddingVertical: 8,
			paddingHorizontal: 16,
			fontSize: 12,
			fontWeight: 600,
			borderRadius: 4,
			color: themeColors.orange500,
			backgroundColor: themeColors.orange100,
		},
	},
	reviewList: {
		position: "relative",
	},
	gradientBackground: {
		position: "relative",
		height: 102,
		alignItems: "flex-end",
		justifyContent: "center",
		flexDirection: "row",
		width: "100%",
		bottom: 48,
	},
	buttonMore: {
		position: "absolute",
		bottom: 0,
		zIndex:3,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
		paddingLeft: 24,
		paddingRight: 16,
		paddingVertical: 8,
		borderRadius: 28,
		borderWidth: 1,
		borderColor: "#DDD",
	},
});
