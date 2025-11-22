import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
	modules: ["@wxt-dev/module-react", "@wxt-dev/unocss"],
	srcDir: "src",
	manifest: {
		description: "AI Side",
		permissions: ["sidePanel"],
		sidePanel: { default_path: "/sidepanel/index.html" },
	},
	vite: () => ({
		resolve: {
			dedupe: ["react", "react-dom", "react-dom/client"],
		},
	}),
	unocss: {
		// Exclude unocss from running for the background
		excludeEntrypoints: ["background"],
	},
});
