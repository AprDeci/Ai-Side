import { useState } from "react";
import { AiConfigList } from "./aiConfig/AiConfigList";
import { AddConfigForm } from "./aiConfig/AddConfigForm";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Cpu } from "lucide-react";

const AiConfig = () => {
	const [configs, setConfigs] = useState<ConfigTypes.AiConfig[]>([]);
	const [isAdding, setIsAdding] = useState(false);

	const handleAddConfig = (config: Omit<ConfigTypes.AiConfig, "id">) => {
		const newConfig: ConfigTypes.AiConfig = {
			...config,
			id: Date.now().toString(),
		};
		setConfigs((prev) => [...prev, newConfig]);
		setIsAdding(false);
	};

	const handleDeleteConfig = (configId: string) => {
		setConfigs((prev) => prev.filter((c) => c.id !== configId));
	};

	const handleToggleActive = (configId: string) => {
		setConfigs((prev) =>
			prev.map((c) => ({
				...c,
				isActive: c.id === configId ? !c.isActive : false,
			})),
		);
	};

	const handleTestConnection = async (configId: string) => {
		// 更新测试状态为pending
		setConfigs((prev) =>
			prev.map((c) =>
				c.id === configId ? { ...c, testResult: "pending" as const } : c,
			),
		);

		try {
			const config = configs.find((c) => c.id === configId);
			if (!config) return;

			// 简单的连接测试
			const testUrl = `${config.endpoint}/models`;

			const response = await fetch(testUrl, {
				headers: {
					Authorization: `Bearer ${config.token}`,
					"Content-Type": "application/json",
				},
			});

			// 200表示成功，401表示认证失败但连接成功
			if (response.ok || response.status === 401) {
				setConfigs((prev) =>
					prev.map((c) =>
						c.id === configId ? { ...c, testResult: "success" as const } : c,
					),
				);
			} else {
				throw new Error("Connection failed");
			}
		} catch (error) {
			setConfigs((prev) =>
				prev.map((c) =>
					c.id === configId ? { ...c, testResult: "failed" as const } : c,
				),
			);
		}
	};

	const handleSaveConfigs = () => {
		console.log("Saving configs:", configs);
		alert("配置已保存");
	};

	return (
		<div className="space-y-6">
			<div className="grid gap-6">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Cpu className="h-5 w-5" />
							AI配置管理
						</CardTitle>
						<CardDescription>
							配置您的AI提供商设置，支持OpenAI、Claude和Gemini
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<AiConfigList
							configs={configs}
							onDeleteConfig={handleDeleteConfig}
							onToggleActive={handleToggleActive}
							onTestConnection={handleTestConnection}
							onAddNew={() => setIsAdding(true)}
							onSaveConfigs={handleSaveConfigs}
						/>

						{isAdding && (
							<AddConfigForm
								onAddConfig={handleAddConfig}
								onCancel={() => setIsAdding(false)}
							/>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default AiConfig;
