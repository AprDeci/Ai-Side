import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

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
      {/* 悬浮按钮 - 使用 UnoCSS 类 */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 w-12 h-12 rounded-full bg-blue-500 text-white text-xl font-bold cursor-pointer z-999999 shadow-lg hover:bg-blue-600 hover:scale-110 transition-all duration-200 flex items-center justify-center">
          ⚡
        </button>
      )}

      {/* 侧边栏本体 - 使用 UnoCSS 类 */}
      <div
        className={`fixed top-0 right-0 h-screen w-87.5 bg-white shadow-[-4px_0_12px_rgba(0,0,0,0.1)] z-2147483647 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}>
        {/* 头部区域 */}
        <div className="p-5 border-b border-gray-200 relative">
          <h3 className="text-lg font-semibold text-gray-800">AI 助手</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 w-6 h-6 text-gray-400 hover:text-gray-600 cursor-pointer text-lg leading-none">
            ✕
          </button>
        </div>

        {/* 内容区域 */}
        <div className="flex-1 p-5 overflow-y-auto">
          <p className="text-gray-600 mb-4">这里是侧边栏的内容区域...</p>
          <p className="text-gray-600 mb-6">可以放聊天框、表单、搜索结果等。</p>

          {/* 示例按钮 */}
          <div className="space-y-3">
            <Button className="w-full">开始对话</Button>
            <Button variant="outline" className="w-full">
              设置
            </Button>
            <Button variant="ghost" className="w-full">
              帮助
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
