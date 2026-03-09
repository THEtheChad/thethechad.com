import {
	StyleSheet
} from "@react-pdf/renderer";
import { SIDEBAR_WIDTH } from "./components/Sidebar/Sidebar";

export const c = {
	sidebarBg: "#111118",
	sidebarText: "#c8c8d8",
	sidebarMuted: "#6a6a80",
	sidebarRule: "rgba(255,255,255,0.12)",
	ink: "#0a0a1a",
	muted: "#6a6a7a",
	accent: "#0771a2",
	white: "#ffffff",
};

export const s = StyleSheet.create({
	page: {
		fontFamily: "Helvetica",
		backgroundColor: c.white,
		// Padding at the Page level applies on every page, including continuations.
		// paddingLeft clears the sidebar; paddingTop/bottom repeat on every page break.
		paddingTop: 44,
		paddingBottom: 44,
		paddingLeft: SIDEBAR_WIDTH + 32,
		paddingRight: 40,
	},

	// ── Sidebar ────────────────────────────────────────────────────
	// Absolutely positioned so it sits outside the normal flow and
	// doesn't consume the page's padded content area.
	sidebar: {
		position: "absolute",
		top: 0,
		left: 0,
		width: SIDEBAR_WIDTH,
		paddingBottom: 36,
	},
	photo: {
		width: SIDEBAR_WIDTH,
		height: 215,
		objectFit: "cover",
		objectPositionX: "center",
		objectPositionY: "top",
	},
	sidebarContent: {
		paddingHorizontal: 20,
		paddingTop: 22,
	},
	sidebarSection: {
		marginTop: 18,
	},
	sidebarSectionTitle: {
		fontFamily: "Helvetica-Bold",
		fontSize: 7,
		letterSpacing: 2,
		color: c.sidebarText,
		textTransform: "uppercase",
		paddingBottom: 4,
		borderBottomWidth: 0.5,
		borderBottomColor: c.accent,
		borderBottomStyle: "solid",
		marginBottom: 8,
	},
	sidebarLabel: {
		fontSize: 6.5,
		color: c.sidebarMuted,
		letterSpacing: 0.8,
		textTransform: "uppercase",
		marginBottom: 1,
	},
	sidebarText: {
		fontSize: 8,
		color: c.sidebarText,
		lineHeight: 1.45,
	},
	sidebarLink: {
		fontSize: 8,
		color: c.sidebarText,
		textDecoration: "none",
	},
	sidebarItem: {
		marginBottom: 9,
	},
	proficiencyItem: {
		marginBottom: 7,
	},
	proficiencyLabel: {
		fontSize: 8,
		color: c.sidebarText,
		marginBottom: 2.5,
	},
	proficiencyTrack: {
		// sidebar content width: SIDEBAR_W - 2 * paddingHorizontal(20) = 165
		width: 165,
		height: 3,
		backgroundColor: "rgba(255,255,255,0.1)",
		position: "relative",
	},

	// ── Main ──────────────────────────────────────────────────────
	// No padding here — it lives on the Page so it repeats on every page.
	main: {
		flex: 1,
	},
	nameFirst: {
		fontFamily: "Helvetica-Bold",
		fontSize: 30,
		letterSpacing: 3,
		color: c.ink,
		lineHeight: 1,
	},
	nameLast: {
		fontFamily: "Helvetica-Bold",
		fontSize: 36,
		letterSpacing: 3,
		color: c.ink,
		lineHeight: 1,
		marginBottom: 7,
	},
	headline: {
		fontSize: 8.5,
		letterSpacing: 2.5,
		color: c.muted,
		textTransform: "uppercase",
		marginBottom: 22,
	},
	section: {
		marginTop: 16,
	},
	sectionTitle: {
		fontFamily: "Helvetica-Bold",
		fontSize: 9,
		letterSpacing: 2,
		color: c.ink,
		textTransform: "uppercase",
		marginBottom: 3,
	},
	sectionRule: {
		height: 2,
		backgroundColor: c.accent,
		marginBottom: 10,
	},
	summary: {
		fontSize: 8.5,
		lineHeight: 1.65,
		color: "#3a3a5a",
	},
	entry: {
		marginBottom: 11,
	},
	entryHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
	},
	entryTitle: {
		fontFamily: "Helvetica-Bold",
		fontSize: 9.5,
		color: c.ink,
	},
	entryDate: {
		fontSize: 8,
		color: c.muted,
		textAlign: "right",
	},
	entryMeta: {
		fontSize: 8,
		color: c.muted,
		marginTop: 1,
		marginBottom: 3,
	},
	descBlock: {
		marginTop: 2,
	},
	descLine: {
		fontSize: 8.5,
		lineHeight: 1.5,
		color: "#3a3a5a",
	},
});