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
