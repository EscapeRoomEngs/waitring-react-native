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
});
