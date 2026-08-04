import type { ComponentProps } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { color, spacing } from "../tokens";

type ScreenProps = ComponentProps<typeof SafeAreaView> & {
	padded?: boolean;
};

export function Screen({ children, padded = true, style, ...props }: ScreenProps) {
	return (
		<SafeAreaView style={[styles.base, style]} {...props}>
			<View testID="screen-content" style={[styles.content, padded && styles.padded]}>
				{children}
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	base: { flex: 1, backgroundColor: color.surface.default },
	content: { flex: 1 },
	padded: { paddingHorizontal: spacing[6] },
});
