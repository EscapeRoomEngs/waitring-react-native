import { fireEvent, render, screen } from "@testing-library/react-native";
import { AppButton } from "../AppButton";

test("calls onPress only while enabled", async () => {
	const onPress = jest.fn();
	const { rerender } = await render(<AppButton label="Continue" onPress={onPress} />);

	await fireEvent.press(screen.getByRole("button", { name: "Continue" }));
	expect(onPress).toHaveBeenCalledTimes(1);

	await rerender(<AppButton label="Continue" onPress={onPress} disabled />);
	expect(screen.getByRole("button", { name: "Continue" })).toBeDisabled();

	await fireEvent.press(screen.getByRole("button", { name: "Continue" }));
	expect(onPress).toHaveBeenCalledTimes(1);
});
