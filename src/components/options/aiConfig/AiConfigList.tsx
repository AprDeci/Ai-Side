import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ConfigItem } from "./ConfigItem";

interface AiConfigListProps {
	configs: ConfigTypes.AiConfig[];
	onDeleteConfig: (id: string) => void;
	onToggleActive: (id: string) => void;
	onTestConnection: (id: string) => void;
	onAddNew: () => void;
	onSaveConfigs: () => void;
}

export const AiConfigList = ({
	configs,
	onDeleteConfig,
	onToggleActive,
	onTestConnection,
	onAddNew,
	onSaveConfigs,
}: AiConfigListProps) => {
	if (configs.length === 0) {
		return (
			<div className="text-center py-8">
				<p className="text-lg text-muted-foreground mb-4">还没有AI配置</p>
				<Button onClick={onAddNew}>
					<Plus className="h-4 w-4 mr-2" />
					添加第一个配置
				</Button>
			</div>
		);
	}

	return (
		<>
			<div className="space-y-4">
				{configs.map((config) => (
					<ConfigItem
						key={config.id}
						config={config}
						onDeleteConfig={onDeleteConfig}
						onToggleActive={onToggleActive}
						onTestConnection={onTestConnection}
					/>
				))}
			</div>

			<div className="flex gap-2 mt-6">
				<Button onClick={onAddNew}>
					<Plus className="h-4 w-4 mr-2" />
					添加配置
				</Button>
				<Button variant="outline" onClick={onSaveConfigs}>
					保存所有配置
				</Button>
			</div>
		</>
	);
};
