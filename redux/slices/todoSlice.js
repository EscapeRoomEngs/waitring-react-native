import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
	name: "todo",
	initialState: {
		currentId: 1,
		todoList: [{ id: 0, text: "예시 투두앱입니다.", completed: false }],
	},
	reducers: {
		addTodo: (state, action) => {
			state.todoList.push({ id: state.currentId++, text: action.payload.trim(), completed: false });
		},
		updateTodo: (state, action) => {
			const idx = state.todoList.findIndex((todo) => todo.id === action.payload);
			if (idx > -1) {
				state.todoList[idx].completed = !state.todoList[idx].completed;
				state.todoList.push(state.todoList.splice(idx, 1)[0]);
			}
		},
		deleteTodo: (state, action) => {
			const idx = state.todoList.findIndex((todo) => todo.id === action.payload);
			if (idx > -1) {
                state.todoList.splice(idx, 1);
			}
		},
	},
});

export default todoSlice.reducer;
export const { addTodo, updateTodo, deleteTodo } = todoSlice.actions;