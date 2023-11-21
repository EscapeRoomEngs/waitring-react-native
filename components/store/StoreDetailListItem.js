import { Text, View } from "react-native";
import MoreVert from "../../assets/icons/more_vert.svg";

export const ReviewItem = ({review, stylesReviewArea}) => {
	return (
		<View style={stylesReviewArea.reviewItem}>
			<View style={stylesReviewArea.reviewItem.profileArea}>
				<View style={stylesReviewArea.reviewItem.profileArea.left}>
					<View style={stylesReviewArea.reviewItem.profile} />
					<View style={stylesReviewArea.reviewItem.nameArea}>
						<Text style={stylesReviewArea.reviewItem.name}>{review.reviewer}</Text>
						<Text style={stylesReviewArea.reviewItem.visitCnt}>{review.visitCnt}번째 방문</Text>
					</View>
				</View>
				<View style={stylesReviewArea.reviewItem.profileArea.right}>
					<Text style={stylesReviewArea.reviewItem.likedButton}>도움이 되었어요!</Text>
					<MoreVert />
				</View>
			</View>
			<Text style={stylesReviewArea.reviewItem.content}>{review.content}</Text>
		</View>
	);
};
