import General from "@/components/options/general";
import OptionHeader from "@/components/options/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings } from "lucide-react";

const tabs = [
	{
		id: "general",
		name: "通用",
		icon: <Settings />,
		content: <General />,
	},
	{
		id: "custom",
		name: "自定义指令",
		icon: <Settings />,
		content: <General />,
	},
];

export default function App() {
	return (
		<>
			<div className="mb-10">
				<OptionHeader />
			</div>
			<div className="text-3xl font-bold px-40 mb-10">选项</div>
			<div className="px-55">
				<div className="flex px-5 gap-20 border border-gray-200 rounded-lg border-solid">
					<div className="Tabs flex flex-col gap-3">
						{tabs.map((tab) => (
							<div
								key={tab.id}
								className="text-[1.3rem] flex gap-2 items-center cursor-pointer hover:text-primary"
							>
								{tab.icon}
								{tab.name}
							</div>
						))}
					</div>
					<div className="flex-1">{tabs[0].content}</div>
				</div>
			</div>
		</>
	);
}
