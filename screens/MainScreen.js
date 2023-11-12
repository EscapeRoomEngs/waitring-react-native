import { StatusBar } from "expo-status-bar";
import React from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import InputForm from "../components/InputForm";
import TodoItem from "../components/TodoItem";
import { useSelector } from "react-redux";

const MainScreen = () => {
    const todos = useSelector(state => state.todo.todoList);
    const todoTasks = todos.filter((item) => !item.completed);
    const completedTasks = todos.filter((item) => item.completed);
	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.pageTitle}>ToDo App</Text>
			<View style={styles.listView}>
				<Text style={styles.listTitle}>할 일</Text>
				{todoTasks.length !== 0 ? (
					<FlatList
						data={todoTasks}
						renderItem={({ item }) => <TodoItem {...item} />}
						keyExtractor={(item) => item.id}
					/>
				) : (
					<Text style={styles.emptyListText}>할 일이 없습니다.</Text>
				)}
			</View>
			<View style={styles.seperator} />
			<View style={styles.listView}>
				<Text style={styles.listTitle}>완료된 일</Text>
				{completedTasks.length !== 0 ? (
					<FlatList
						data={completedTasks}
						renderItem={({ item }) => <TodoItem {...item} />}
						keyExtractor={(item) => item.id}
					/>
				) : (
					<Text style={styles.emptyListText}>완료된 일이 없습니다.</Text>
				)}
			</View>
			<InputForm />
		</SafeAreaView>
	);
};

export default MainScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
		backgroundColor: "#f4f4f4",
	},
	pageTitle: {
		fontSize: 24,
		fontWeight: "bold",
		margin: 10,
	},
	seperator: {
		marginVertical: 20,
		marginHorizontal: 10,
		borderBottomWidth: 1,
		borderBottomColor: "rgba(0,0,0,0.2)",
	},
	listView: {
		flex: 1,
		margin: 10,
	},
	listTitle: {
		fontSize: 18,
		fontWeight: "semibold",
	},
});
