import { StyleSheet, Text, TextInput, type TextInputProps, View } from "react-native";
import { color, radius, spacing, typography } from "../tokens";

type TextFieldProps = TextInputProps & {
	label: string;
	error?: string;
};

export function TextField({ label, error, style, ...inputProps }: TextFieldProps) {
	return (
		<View style={styles.container}>
			<Text style={styles.label}>{label}</Text>
			<TextInput
				accessibilityLabel={label}
				style={[styles.input, error && styles.inputError, style]}
				{...inputProps}
			/>
			{error ? (
				<Text accessibilityRole="alert" style={styles.error}>
					{error}
				</Text>
			) : null}
		</View>
	);
}

const styles = StyleSheet.create({
	container: { gap: spacing[2] },
	label: { ...typography.body.md, color: color.text.primary },
	input: {
		borderColor: color.border.strong,
		borderRadius: radius.md,
		borderWidth: 1,
		minHeight: 48,
		paddingHorizontal: spacing[3],
	},
	inputError: { borderColor: color.action.primary },
	error: { ...typography.body.sm, color: color.action.primary },
});
