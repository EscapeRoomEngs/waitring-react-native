import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";

import { store } from "../redux/store";
import { queryClient } from "../src/query/client";

export default function RootLayout() {
	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<StatusBar style="dark" />
				<Stack screenOptions={{ headerShown: false }} />
			</QueryClientProvider>
		</Provider>
	);
}
