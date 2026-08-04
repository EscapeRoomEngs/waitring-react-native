import { render, screen } from "@testing-library/react-native";
import { color } from "../../tokens";
import { TextField } from "../TextField";

test("connects a visible label and optional error to the input", async () => {
	await render(<TextField label="Phone number" error="Enter a valid number" />);

	expect(screen.getByLabelText("Phone number")).toBeTruthy();
	expect(screen.getByText("Enter a valid number")).toBeTruthy();
	expect(screen.getByText("Enter a valid number")).toHaveStyle({
		color: color.feedback.error,
	});
});

test("enforces the visible label as the input accessibility label", async () => {
	await render(<TextField accessibilityLabel="Override" label="Phone number" />);

	expect(screen.getByLabelText("Phone number")).toBeTruthy();
	expect(screen.queryByLabelText("Override")).toBeNull();
});
