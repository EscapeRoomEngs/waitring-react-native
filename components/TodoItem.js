import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import CheckboxUnchecked from "../assets/checkbox-unchecked.svg";
import CheckboxChecked from "../assets/checkbox-checked.svg";
import DeleteIcon from "../assets/delete.svg";
import { updateTodo, deleteTodo } from "../redux/slices/todoSlice";

const TodoItem = (props) => {
	const dispatch = useDispatch();
	return (
		<View style={styles.itemContainer}>
			<Pressable
				style={styles.itemCheckbox}
				hitSlop={10}
				onPress={() => dispatch(updateTodo(props.id))}>
				{props.completed ? (
					<CheckboxChecked style={styles.itemCheckboxCheckedIcon} />
				) : (
					<CheckboxUnchecked />
				)}
			</Pressable>
			<Text style={[styles.itemText, props.completed ? styles.itemTextChecked : ""]}>
				{props.text}
			</Text>
			<Pressable
				style={[styles.deleteButton, props.completed ? styles.deleteButtonDone : ""]}
				hitSlop={10}
				onPress={() => dispatch(deleteTodo(props.id))}>
				<DeleteIcon />
			</Pressable>
		</View>
	);
};

export default TodoItem;

const styles = StyleSheet.create({
	itemContainer: {
		flexDirection: "row",
		alignItems: "center",
		paddingTop: 10,
		paddingBotoom: 15,
		paddingHorizontal: 15,
		backgroundColor: "#f7f8fa",
	},
	itemCheckbox: {
		justifyContent: "center",
		alignItems: "center",
		width: 20,
		height: 20,
		marginRight: 13,
		borderRadius: 6,
	},
	itemCheckboxCheckedIcon: {
		shadowColor: "#000",
		shadowOpacity: 0.14,
		shadowRadius: 8,
		shadowOffset: {
			width: 0,
			height: 4,
		},
	},
	itemText: {
		marginRight: "auto",
		paddingRight: 10,
		fontSize: 15,
		lineHeight: 20,
		color: "#737373",
	},
	itemTextChecked: {
		opacity: 0.3,
		textDecorationLine: "line-through",
	},
	deleteButton: {
		opacity: 1,
	},
	deleteButtonDone: {
		opacity: 0.3,
	},
});
