export default defineBackground(() => {
	console.log("Hello background!", { id: browser.runtime.id });

	browser.runtime.onMessage.addListener((message, sender) => {
		if (message.action === "open_sidebar") {
			if (sender.tab?.id) {
				browser.sidePanel.open({ windowId: sender.tab.windowId });
			}
		}
	});
});
