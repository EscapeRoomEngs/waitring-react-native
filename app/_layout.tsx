import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";

import { store } from "../redux/store";

export default function RootLayout() {
	return (
		<Provider store={store}>
			<StatusBar style="dark" />
			<Stack screenOptions={{ headerShown: false }} />
		</Provider>
	);
}
