import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { AiConfig, ProviderType } from "@/types/types";

interface AddConfigFormProps {
	onAddConfig: (config: Omit<AiConfig, 'id'>) => void;
	onCancel: () => void;
}

const providerOptions = [
	{ value: 'OPENAI', label: 'OpenAI', description: 'GPT模型API' },
	{ value: 'CLAUDE', label: 'Claude', description: 'Anthropic Claude API' },
	{ value: 'GEMINI', label: 'Gemini', description: 'Google Gemini API' },
];

const getDefaultEndpoint = (provider: ProviderType) => {
	switch (provider) {
		case 'OPENAI':
			return 'https://api.openai.com/v1';
		case 'CLAUDE':
			return 'https://api.anthropic.com/v1';
		case 'GEMINI':
			return 'https://generativelanguage.googleapis.com/v1';
		default:
			return '';
	}
};

export const AddConfigForm = ({ onAddConfig, onCancel }: AddConfigFormProps) => {
	const [formData, setFormData] = useState({
		name: '',
		provider: 'OPENAI' as ProviderType,
		endpoint: '',
		token: '',
		isActive: false,
	});

	const handleProviderChange = (provider: ProviderType) => {
		setFormData(prev => ({
			...prev,
			provider,
			endpoint: getDefaultEndpoint(provider),
		}));
	};

	const handleSubmit = () => {
		if (!formData.name.trim() || !formData.endpoint.trim() || !formData.token.trim()) {
			alert('请填写所有必需字段');
			return;
		}

		onAddConfig({
			name: formData.name.trim(),
			provider: formData.provider,
			endpoint: formData.endpoint.trim(),
			token: formData.token.trim(),
			isActive: false,
		});
	};

	return (
		<div className="border rounded-lg p-4 bg-muted/50">
			<div className="space-y-4">
				<div>
					<Label htmlFor="config-name">配置名称</Label>
					<Input
						id="config-name"
						placeholder="例如：我的OpenAI配置"
						value={formData.name}
						onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
					/>
				</div>

				<div>
					<Label htmlFor="config-provider">AI提供商</Label>
					<Select value={formData.provider} onValueChange={handleProviderChange}>
						<SelectTrigger>
							<SelectValue placeholder="选择AI提供商" />
						</SelectTrigger>
						<SelectContent>
							{providerOptions.map((option) => (
								<SelectItem key={option.value} value={option.value}>
									<div>
										<div className="font-medium">{option.label}</div>
										<div className="text-xs text-muted-foreground">{option.description}</div>
									</div>
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div>
					<Label htmlFor="config-endpoint">API端点</Label>
					<Input
						id="config-endpoint"
						placeholder="https://api.openai.com/v1"
						value={formData.endpoint}
						onChange={(e) => setFormData(prev => ({ ...prev, endpoint: e.target.value }))}
					/>
				</div>

				<div>
					<Label htmlFor="config-token">API Token</Label>
					<Input
						id="config-token"
						type="password"
						placeholder="sk-..."
						value={formData.token}
						onChange={(e) => setFormData(prev => ({ ...prev, token: e.target.value }))}
					/>
				</div>

				<div className="flex gap-2">
					<Button onClick={handleSubmit}>
						添加配置
					</Button>
					<Button variant="outline" onClick={onCancel}>
						取消
					</Button>
				</div>
			</div>
		</div>
	);
};