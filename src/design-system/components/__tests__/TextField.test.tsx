import { render, screen } from "@testing-library/react-native";
import { TextField } from "../TextField";

test("connects a visible label and optional error to the input", async () => {
	await render(<TextField label="Phone number" error="Enter a valid number" />);

	expect(screen.getByLabelText("Phone number")).toBeTruthy();
	expect(screen.getByText("Enter a valid number")).toBeTruthy();
});
