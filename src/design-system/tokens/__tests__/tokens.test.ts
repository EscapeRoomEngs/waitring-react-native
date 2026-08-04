import { color, radius, spacing, typography } from "../index";
import { themeColors } from "../../../../styles/variables";

describe("design tokens", () => {
	test("exposes the semantic values used by the legacy palette", () => {
		expect(color.text.primary).toBe("#191919");
		expect(color.action.primary).toBe("#FF3D00");
		expect(spacing[6]).toBe(24);
		expect(radius.lg).toBe(8);
		expect(typography.heading.lg.fontSize).toBe(24);
	});

	test("keeps every existing legacy color key available", () => {
		expect(themeColors).toMatchObject({
			gray100: color.surface.subtle,
			gray900: color.text.primary,
			orange500: color.action.primary,
			borderBottom: color.border.strong,
		});
	});

	test("provides an AA-contrast error feedback color on the default surface", () => {
		expect(contrastRatio(color.feedback.error, color.surface.default)).toBeGreaterThanOrEqual(4.5);
	});
});

function contrastRatio(foreground: string, background: string) {
	const foregroundLuminance = relativeLuminance(foreground);
	const backgroundLuminance = relativeLuminance(background);
	const lighter = Math.max(foregroundLuminance, backgroundLuminance);
	const darker = Math.min(foregroundLuminance, backgroundLuminance);

	return (lighter + 0.05) / (darker + 0.05);
}

function relativeLuminance(hex: string) {
	const channels = hex
		.slice(1)
		.match(/.{2}/g)
		?.map((channel) => Number.parseInt(channel, 16) / 255);

	if (!channels || channels.length !== 3) {
		throw new Error(`Expected a six-digit hex color, received ${hex}`);
	}

	const [red, green, blue] = channels.map((channel) =>
		channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
	);

	return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}
