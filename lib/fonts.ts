import { Alexandria, IBM_Plex_Sans_Arabic, Inter, Inter_Tight } from "next/font/google";

const alexandria = Alexandria({ subsets: ["arabic", "latin"], weight: ["300", "500", "700", "800"], variable: "--font-ar-display", display: "swap" });
const plexArabic = IBM_Plex_Sans_Arabic({ subsets: ["arabic", "latin"], weight: ["400", "500", "600"], variable: "--font-ar-text", display: "swap" });
const interTight = Inter_Tight({ subsets: ["latin"], weight: ["300", "500", "600", "700", "800"], variable: "--font-en-display", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-en-text", display: "swap" });

export const fontVariables = [alexandria.variable, plexArabic.variable, interTight.variable, inter.variable].join(" ");
