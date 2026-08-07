import { StyleSheet, Text, View } from "react-native";
import MoreVert from "../../assets/icons/more_vert.svg";
import { themeColors } from "../../styles/variables";

const defaultReviewList = [
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

export const ReviewListArea = ({ reviewList = defaultReviewList }) => {
	return (
		<View>
			{reviewList.map((review, ridx) => (
				<ReviewListItem key={ridx} review={review} />
			))}
		</View>
	);
};
const ReviewListItem = ({ review }) => {
	return (
		<View style={stylesReviewItem}>
			<View style={stylesReviewItem.profileArea}>
				<View style={stylesReviewItem.profileArea.left}>
					{/* TODO: 프로필 이미지 변경 */}
					<View style={stylesReviewItem.profile} />
					<View style={stylesReviewItem.nameArea}>
						<Text style={stylesReviewItem.name}>{review.reviewer}</Text>
						<Text style={stylesReviewItem.visitCnt}>{review.visitCnt}번째 방문</Text>
					</View>
				</View>
				<View style={stylesReviewItem.profileArea.right}>
					<Text style={stylesReviewItem.likedButton}>도움이 되었어요!</Text>
					<MoreVert />
				</View>
			</View>
			<Text style={stylesReviewItem.content}>{review.content}</Text>
		</View>
	);
};
const stylesReviewItem = StyleSheet.create({
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
});
