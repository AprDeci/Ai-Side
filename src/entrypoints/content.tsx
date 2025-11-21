import FloatingButton from "@/components/FloatingButton";
import React from "react";
import ReactDOM from "react-dom/client";
import "./content-style.css";
import "virtual:uno.css";
import "@unocss/reset/tailwind-v4.css";
import "@unocss/reset/tailwind-compat.css";

import Sidebar from "@/components/Sidebar";
import "@/assets/sidebar.css"; // 引入 CSS

export default defineContentScript({
	matches: ["<all_urls>"],
	cssInjectionMode: "ui", // 关键：隔离样式

	async main(ctx) {
		const ui = await createShadowRootUi(ctx, {
			name: "my-in-page-sidebar",
			position: "inline", // 必须是 inline，因为我们内部用了 fixed 定位
			onMount: (container) => {
				const root = ReactDOM.createRoot(container);
				root.render(<Sidebar/>);
				return root;
			},
			onRemove: (root) => {
				root?.unmount();
			},
		});

		ui.mount();
	},
});
