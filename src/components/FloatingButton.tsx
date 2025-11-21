// src/components/FloatingButton.tsx
import React from "react";

import { browser } from "wxt/browser";

export default function FloatingButton() {
  const openSidePanel = () => {
    browser.runtime.sendMessage({ action: "open_sidebar" });
  };

  return (
    <div>
      <div className="fixed right-0 bottom-1/2 cursor-pointer rounded-full bg-orange-200 w-12 h-12 flex items-center justify-center">
        ⚡
      </div>
    </div>
  );
}
