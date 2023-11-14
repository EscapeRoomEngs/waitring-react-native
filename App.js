import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { store } from './redux/store';
import MainScreen from "./screens/MainScreen";
import Main from "./screens/store/StoreDetail";

// TODO: react-navigation 이용한 페이지 이동 구현
export default function App() {
	return (
		<>
			<Provider store={store}>
				<Main />
			</Provider>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
