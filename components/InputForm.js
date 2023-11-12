import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/slices/todoSlice";

const InputForm = () => {
	const [currentValue, setCurrentValue] = useState("");
	const dispatch = useDispatch();

	const handleSubmit = () => {
		if (currentValue !== "") {
			dispatch(addTodo(currentValue));
			setCurrentValue("");
		}
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.addFormContainer}>
			<TextInput
				style={styles.inputField}
				placeholder="할 일을 작성해주세요."
				value={currentValue}
				onChangeText={setCurrentValue}
				onSubmitEditing={handleSubmit}
			/>
			<Pressable style={[styles.addButton, currentValue!==""?styles.addButtonActivate:""]} onPress={handleSubmit}>
				<Text style={styles.addButtonText}>+</Text>
			</Pressable>
		</KeyboardAvoidingView>
	);
};

export default InputForm;

const styles = StyleSheet.create({
	addFormContainer: {
		flexDirection: "row",
		marginTop: "auto",
		marginBottom: 20,
		paddingHorizontal: 10,
	},
	inputField: {
		flex: 1,
		height: 42,
		paddingHorizontal: 15,
		marginRight: 10,
		borderRadius: 4,
		borderWidth: 1,
		borderColor: "rgba(0,0,0,0.4)",
		fontSize: 16,
		textAlignVertical: "center",
	},
	addButton: {
		justifyContent: "center",
		alignContent: "center",
		width: 42,
		height: 42,
		borderRadius: 4,
		backgroundColor: "rgba(0,0,0,0.2)",
		alignItems: "center",
	},
	addButtonActivate: {
        backgroundColor: "rgba(0,0,0,0.4)",
    },
	addButtonText: {
		fontSize: 25,
		color: "#fff",
	},
});
