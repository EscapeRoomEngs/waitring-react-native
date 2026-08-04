import type { ComponentProps } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { color, spacing } from "../tokens";

type ScreenProps = ComponentProps<typeof SafeAreaView> & {
	padded?: boolean;
};

export function Screen({ padded = true, style, ...props }: ScreenProps) {
	return <SafeAreaView style={[styles.base, padded && styles.padded, style]} {...props} />;
}

const styles = StyleSheet.create({
	base: { flex: 1, backgroundColor: color.surface.default },
	padded: { paddingHorizontal: spacing[6] },
});
