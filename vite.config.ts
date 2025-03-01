import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

export default defineConfig({
	plugins: [
		react(),
		svgr(),
		VitePWA({
			registerType: "autoUpdate",
			includeAssets: ["favicon.svg", "icons/*.png"],
			manifest: {
				name: "Akara",
				short_name: "Akara",
				description: "Akara Application",
				theme_color: "#000000",
				icons: [
					{
						src: "/favicon_io/android-chrome-192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "/favicon_io/android-chrome-512x512.png",
						sizes: "512x512",
						type: "image/png",
					},
					{
						src: "/favicon_io/apple-touch-icon.png",
						sizes: "180x180",
						type: "image/png",
						purpose: "any maskable",
					},
				],
			},
			workbox: {
				globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
				maximumFileSizeToCacheInBytes: 6 * 1024 * 1024, // Increase the file size limit to 6 MB
				runtimeCaching: [
					{
						urlPattern:
							/.*\.(?:js|css|html|png|jpg|jpeg|svg|gif|woff2?|ttf|otf|eot)$/,
						handler: "CacheFirst",
						options: {
							cacheName: "assets-cache",
							expiration: {
								maxEntries: 100,
								maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
							},
						},
					},
				],
			},
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});

// build: {
// 	rollupOptions: {
// 		external: ["yup"], // Replace with the actual module name
// 	},
// },
// server: {
// 	port: 5173,
// },
