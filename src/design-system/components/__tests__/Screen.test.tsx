import { render, screen } from "@testing-library/react-native";
import { Text } from "react-native";
import { Screen } from "../Screen";

test("renders children inside the screen container", async () => {
	await render(
		<Screen>
			<Text>Content</Text>
		</Screen>
	);

	expect(screen.getByText("Content")).toBeTruthy();
});

test("places optional horizontal padding on the content wrapper", async () => {
	const { rerender } = await render(
		<Screen testID="screen">
			<Text>Content</Text>
		</Screen>
	);

	expect(screen.getByTestId("screen")).not.toHaveStyle({ paddingHorizontal: 24 });
	expect(screen.getByTestId("screen-content")).toHaveStyle({ paddingHorizontal: 24 });

	await rerender(
		<Screen padded={false} testID="screen">
			<Text>Content</Text>
		</Screen>
	);

	expect(screen.getByTestId("screen-content")).not.toHaveStyle({ paddingHorizontal: 24 });
});
