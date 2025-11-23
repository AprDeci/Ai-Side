import { useState, useRef, useEffect } from "react";
import General from "@/components/options/general";
import OptionHeader from "@/components/options/header";
import { Settings } from "lucide-react";
import AIConfig from "@/components/options/ai-config";

const tabs = [
	// {
	// 	id: "general",
	// 	name: "通用",
	// 	icon: <Settings />,
	// 	content: <General />,
	// },
	{
		id: "ai-config",
		name: "AI 配置",
		icon: <Settings />,
		content: <AIConfig />,
	},
	// {
	// 	id: "custom",
	// 	name: "自定义指令",
	// 	icon: <Settings />,
	// 	content: <General />,
	// },
];

export default function App() {
	const [activeTab, setActiveTab] = useState(tabs[0].id);
	const [activeTabIndex, setActiveTabIndex] = useState(0);
	const tabRefs = useRef<(HTMLDivElement | null)[]>([]);

	const currentTab = tabs.find((tab) => tab.id === activeTab);

	// 更新当前活跃选项卡的索引
	useEffect(() => {
		const index = tabs.findIndex((tab) => tab.id === activeTab);
		setActiveTabIndex(index);
	}, [activeTab]);

	// 监听选项卡点击并更新索引
	const handleTabClick = (tabId: string, index: number) => {
		setActiveTab(tabId);
	};

	return (
		<>
			<div className="mb-10">
				<OptionHeader />
			</div>
			<div className="text-3xl font-bold px-40 mb-10">选项</div>
			<div className="px-55">
				<div className="flex px-5 gap-20 border border-gray-200 rounded-lg border-solid">
					<div className="relative Tabs flex flex-col gap-3">
						{/* 滑动指示器 */}
						<div
							className="absolute left-0 w-1 bg-primary rounded-full transition-all duration-300 ease-in-out"
							style={{
								top: `${activeTabIndex * 52 + 6}px`,
								height: "40px",
							}}
						/>

						{/* 选项卡列表 */}
						{tabs.map((tab, index) => (
							<div
								ref={(el) => {
									tabRefs.current[index] = el;
								}}
								key={tab.id}
								onClick={() => handleTabClick(tab.id, index)}
								className={`text-[1.3rem] flex gap-2 items-center cursor-pointer transition-all duration-200 relative z-10 ${
									activeTab === tab.id
										? "text-primary font-medium"
										: "text-gray-600 hover:text-primary"
								}`}
								style={{
									paddingLeft: "12px",
									paddingRight: "12px",
									paddingTop: "10px",
									paddingBottom: "10px",
									borderRadius: "6px",
								}}
							>
								{tab.icon}
								{tab.name}
							</div>
						))}
					</div>
					<div className="flex-1">{currentTab?.content}</div>
				</div>
			</div>
		</>
	);
}
