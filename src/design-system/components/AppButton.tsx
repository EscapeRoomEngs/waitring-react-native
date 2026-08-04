import { Pressable, StyleSheet, Text } from "react-native";
import { color, radius, spacing, typography } from "../tokens";

type AppButtonProps = {
	label: string;
	variant?: "primary" | "secondary";
	disabled?: boolean;
	onPress?: () => void;
};

export function AppButton({
	label,
	variant = "primary",
	disabled = false,
	onPress,
}: AppButtonProps) {
	const isPrimary = variant === "primary";

	return (
		<Pressable
			accessibilityRole="button"
			accessibilityLabel={label}
			accessibilityState={{ disabled }}
			disabled={disabled}
			onPress={onPress}
			style={[
				styles.base,
				isPrimary ? styles.primary : styles.secondary,
				disabled && styles.disabled,
			]}
		>
			<Text style={isPrimary ? styles.primaryLabel : styles.secondaryLabel}>{label}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	base: {
		alignItems: "center",
		borderRadius: radius.md,
		justifyContent: "center",
		minHeight: 56,
		paddingHorizontal: spacing[6],
	},
	primary: { backgroundColor: color.action.primary },
	secondary: { backgroundColor: color.action.primarySubtle },
	disabled: { opacity: 0.45 },
	primaryLabel: { ...typography.button, color: color.text.inverse },
	secondaryLabel: { ...typography.button, color: color.action.primary },
});
