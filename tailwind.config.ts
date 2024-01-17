import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}"],
	darkMode: "class",
	corePlugins: {
		// disable some core plugins as they are included in the css, even when unused
		touchAction: false,
		ringOffsetWidth: false,
		ringOffsetColor: false,
		scrollSnapType: false,
		borderOpacity: false,
		textOpacity: false,
		fontVariantNumeric: false,
	},
	theme: {
		extend: {
			animation: {
				"jello": "jello 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) 1",
				"jello-infinite": "jello 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) infinite",
				"rubber-band": "rubberBand 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) 1",
				"rubber-band-infinite": "rubberBand 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) infinite",
				"tada": "tada 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) 1",
				"tada-infinite": "tada 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) infinite",
				"wobble": "wobble 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) 1",
				"wobble-infinite": "wobble 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) infinite",
				"zoom-in-down": "zoomInDown 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) 1",
			},
			keyframes: {
				"jello": {
					"11.1%, 100%": { transform: "translate3d(0,0,0)" },
					"22.2%": { transform: "skewX(-12.5deg) skewY(-12.5deg)" },
					"33.3%": { transform: "skewX(6.25deg) skewY(6.25deg)" },
					"44.4%": { transform: "skewX(-3.125deg) skewY(-3.125deg)" },
					"55.5%": { transform: "skewX(1.5625deg) skewY(1.5625deg)" },
					"66.6%": { transform: "skewX(-0.78125deg) skewY(-0.78125deg)" },
					"77.7%": { transform: "skewX(0.390625deg) skewY(0.390625deg)" },
					"88.8%": { transform: "skewX(-0.1953125deg) skewY(-0.1953125deg)" },
				},
				"rubber-band": {
					"0%, 100%": { transform: "scale3d(1, 1, 1)" },
					"30%": { transform: "scale3d(1.25, 0.75, 1)" },
					"40%": { transform: "scale3d(0.75, 1.25, 1)" },
					"50%": { transform: "scale3d(1.15, 0.85, 1)" },
					"65%": { transform: "scale3d(0.95, 1.05, 1)" },
					"75%": { transform: "scale3d(1.05, 0.95, 1)" },	
				},
				"tada": {
					"0%, 100%": { transform: "scale3d(1, 1, 1)" },
					"10%, 20%": { transform: "scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)" },
					"30%, 50%, 70%, 90%": { transform: "scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)" },
					"40%, 60%, 80%": { transform: "scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)" },
				},
				"wobble": {
					"0%, 100%": { transform: "translate3d(0%, 0, 0) rotate3d(0, 0, 1, 0deg)" },
					"15%": { transform: "translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg)" },
					"30%": { transform: "translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg)" },
					"45%": { transform: "translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg)" },
					"60%": { transform: "translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg)" },
					"75%": { transform: "translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg)" },
				},
				"zoom-in-down": {
					"0%": { opacity: "0", transform: "scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0) rotate3d(0, 0, 1, -45deg)", animationTimingFunction: "cubic-bezier(0.550, 0.055, 0.675, 0.190)" },
					"60%": { opacity: "1", transform: "scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0) rotate3d(0, 0, 1, -45deg)", animationTimingFunction: "cubic-bezier(0.175, 0.885, 0.320, 1)" },
				}
			},
			colors: {
				bgColor: "hsl(var(--theme-bg) / <alpha-value>)",
				textColor: "hsl(var(--theme-text) / <alpha-value>)",
				link: "hsl(var(--theme-link) / <alpha-value>)",
				accent: "hsl(var(--theme-accent) / <alpha-value>)",
				"accent-2": "hsl(var(--theme-accent-2) / <alpha-value>)",
				quote: "hsl(var(--theme-quote) / <alpha-value>)",
			},
			fontFamily: {
				// Add any custom fonts here
				sans: [...fontFamily.sans],
				serif: [...fontFamily.serif],
				mono: ["MonoLisa Variable", ...fontFamily.mono],
			},
			transitionProperty: {
				height: "height",
			},
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			// Remove above once tailwindcss exposes theme type
			typography: (theme) => ({
				cactus: {
					css: {
						"--tw-prose-body": theme("colors.textColor / 1"),
						"--tw-prose-headings": theme("colors.accent-2 / 1"),
						"--tw-prose-links": theme("colors.link / 1"),
						"--tw-prose-bold": theme("colors.textColor / 1"),
						"--tw-prose-bullets": theme("colors.textColor / 1"),
						"--tw-prose-quotes": theme("colors.quote / 1"),
						"--tw-prose-code": theme("colors.textColor / 1"),
						"--tw-prose-hr": "0.5px dashed #666",
						"--tw-prose-th-borders": "#666",
					},
				},
				DEFAULT: {
					css: {
						a: {
							"@apply cactus-link no-underline": "",
						},
						strong: {
							fontWeight: "700",
						},
						code: {
							border: "1px dotted #666",
							borderRadius: "2px",
						},
						blockquote: {
							borderLeftWidth: "0",
						},
						hr: {
							borderTopStyle: "dashed",
						},
						thead: {
							borderBottomWidth: "none",
						},
						"thead th": {
							fontWeight: "700",
							borderBottom: "1px dashed #666",
						},
						"tbody tr": {
							borderBottomWidth: "none",
						},
						tfoot: {
							borderTop: "1px dashed #666",
						},
						sup: {
							"@apply ms-0.5": "",
							a: {
								"@apply bg-none": "",
								"&:hover": {
									"@apply text-link no-underline bg-none": "",
								},
								"&:before": {
									content: "'['",
								},
								"&:after": {
									content: "']'",
								},
							},
						},
					},
				},
				sm: {
					css: {
						code: {
							fontSize: theme("fontSize.sm")[0],
							fontWeight: "400",
						},
					},
				},
			}),
		},
	},
	plugins: [
		require("@tailwindcss/typography"),
		plugin(function ({ addComponents }) {
			addComponents({
				".cactus-link": {
					"@apply bg-[size:100%_6px] bg-bottom bg-repeat-x": {},
					backgroundImage:
						"linear-gradient(transparent,transparent 5px,hsl(var(--theme-link)) 5px,hsl(var(--theme-link)))",
					"&:hover": {
						backgroundImage:
							"linear-gradient(transparent,transparent 4px,hsl(var(--theme-link)) 4px,hsl(var(--theme-link)))",
					},
				},
				".title": {
					"@apply text-2xl font-semibold text-accent-2": {},
				},
				".subtitle": {
					"@apply text-xl font-semibold text-accent-2": {},
				}
			});
		}),
	],
} satisfies Config;
