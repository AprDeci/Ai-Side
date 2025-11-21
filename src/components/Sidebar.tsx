import { useState, useEffect } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // 当 isOpen 变化时，操作网页的 body
    if (isOpen) {
      document.body.style.transition = "margin-right 0.3s ease";
      document.body.style.marginRight = "350px"; // 侧边栏宽度
    } else {
      document.body.style.marginRight = "0px";
    }

    // 清理函数：组件卸载时恢复网页原样
    return () => {
      document.body.style.marginRight = "0px";
    };
  }, [isOpen]);

  return (
    <>
      {/* 1. 悬浮按钮 (当侧边栏打开时，可以选择隐藏按钮，也可以保留) */}
      {!isOpen && <button className="floating-toggle-btn">Open</button>}

      {/* 2. 侧边栏本体 */}
      <div className={`sidebar-container ${isOpen ? "open" : ""}`}>
        <div style={{ padding: "20px", borderBottom: "1px solid #eee" }}>
          <h3>AI 助手</h3>
          <button className="close-btn" onClick={() => setIsOpen(false)}>
            ✕
          </button>
        </div>

        <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
          <p>这里是侧边栏的内容区域...</p>
          <p>可以放聊天框、表单、搜索结果等。</p>
        </div>
      </div>
    </>
  );
}
