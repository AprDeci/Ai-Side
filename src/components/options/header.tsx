import { Bot, Settings } from "lucide-react";

const OptionHeader = () => {
	return (
		<header className="bg-white border-b border-gray-200 h-16 px-6 flex items-center justify-between shadow-sm">
			<div className="flex items-center gap-3">
				<Bot className="h-8 w-8 text-blue-600" />
				<div>
					<h1 className="text-xl font-bold text-gray-900">AI Side 设置</h1>
					<p className="text-sm text-gray-500">自定义您的 AI 助手体验</p>
				</div>
			</div>
			<div className="flex items-center gap-2">
				<Settings className="h-5 w-5 text-gray-400" />
				<span className="text-sm text-gray-500">版本 1.0.0</span>
			</div>
		</header>
	);
};

export default OptionHeader;
