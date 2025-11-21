import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MessageSquare } from "lucide-react"; // 假设你安装了 lucide-react 图标库，如果没有可以用文本代替

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  // 侧边栏宽度配置 (方便统一修改)
  const sidebarWidth = "w-[350px]";

  useEffect(() => {
    // 挤压网页内容 (可选，如果不想要挤压效果可以删掉这部分)
    if (isOpen) {
      document.body.style.transition =
        "margin-right 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
      document.body.style.marginRight = "350px";
    } else {
      document.body.style.marginRight = "0px";
    }
    return () => {
      document.body.style.marginRight = "0px";
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={`fixed top-0 right-0 h-screen ${sidebarWidth} bg-white shadow-[-4px_0_15px_rgba(0,0,0,0.1)] z-[2147483647] transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}>
        <div className="absolute top-1/2 left-0 -translate-x-full -translate-y-1/2 flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="
                  flex items-center justify-center 
                  w-12 h-12 
                  bg-white text-blue-600 
                  rounded-l-xl 
                  shadow-[-4px_2px_10px_rgba(0,0,0,0.1)] 
                  border-y border-l border-gray-100
                  hover:bg-gray-50 hover:w-14 hover:text-blue-700
                  transition-all duration-200
                  cursor-pointer
                "
            title={isOpen ? "收起" : "打开 AI 助手"}>
            {isOpen ? <ChevronRight size={24} /> : <MessageSquare size={24} />}
          </button>
        </div>

        <div className="flex flex-col h-full w-full">
          {/* 头部 */}
          <div className="p-5 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              Ai-Side
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
              ✕
            </button>
          </div>

          {/* 滚动区域 */}
          <div className="flex-1 p-5 overflow-y-auto">
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">
              侧边栏内容区域。当点击左侧悬浮按钮时，该面板会滑出，按钮会紧贴面板左边缘移动。
            </p>

            <div className="space-y-3 mt-8">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                开始新对话
              </Button>
              <Button variant="outline" className="w-full">
                查看历史记录
              </Button>
            </div>
          </div>

          {/* 底部 */}
          <div className="p-4 border-t border-gray-100 text-center text-xs text-gray-400">
            Powered by Your App
          </div>
        </div>
      </div>
    </>
  );
}
