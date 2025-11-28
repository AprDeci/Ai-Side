import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MessageSquare } from "lucide-react"; // 假设你安装了 lucide-react 图标库，如果没有可以用文本代替
import ChatContainer from "./sideBar/chatContainer";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const sidebarWidth = "w-[350px]";

  return (
    <>
      <div
        className={`fixed top-0 right-0 h-screen ${sidebarWidth} bg-white shadow-[-4px_0_15px_rgba(0,0,0,0.1)] z-[10001] transition-transform duration-300 ease-in-out ${
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
          <div className="h-10 p-5 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
            <h3 className="text-lg font-bold text-yellow-800 flex items-center gap-2">
              Ai-Side
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
              ✕
            </button>
          </div>

          {/* 滚动区域 */}
          <div className="flex-1 p-5 overflow-y-auto overflow-x-hidden">
            <ChatContainer />
          </div>
        </div>
      </div>
    </>
  );
}
