import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
	modules: ["@wxt-dev/module-react", "@wxt-dev/unocss"],
	srcDir: "src",
	manifest: {
		permissions: ["sidePanel"],
		sidePanel: { default_path: "/sidepanel/index.html" },
		action: {
			default_title: "打开侧边栏",
		},
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
