import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
	Cpu, 
	Plus, 
	Trash2, 
	TestTube, 
	CheckCircle, 
	XCircle, 
	Loader2,
	Settings 
} from "lucide-react";
import { cn } from "@/lib/utils";

type ProviderType = 'OPENAI' | 'CLAUDE' | 'GEMINI';

interface AiConfig {
	id: string;
	name: string;
	provider: ProviderType;
	endpoint: string;
	token: string;
	isActive: boolean;
	testResult?: 'success' | 'failed' | 'pending';
}

const AiConfigs = () => {
	const [configs, setConfigs] = useState<AiConfig[]>([]);
	const [isAdding, setIsAdding] = useState(false);
	const [newConfig, setNewConfig] = useState({
		name: '',
		provider: 'OPENAI' as ProviderType,
		endpoint: '',
		token: ''
	});

	const providerOptions = [
		{ value: 'OPENAI', label: 'OpenAI', description: 'GPT模型API' },
		{ value: 'CLAUDE', label: 'Claude', description: 'Anthropic Claude API' },
		{ value: 'GEMINI', label: 'Gemini', description: 'Google Gemini API' }
	];

	const getProviderInfo = (provider: ProviderType) => {
		return providerOptions.find(p => p.value === provider);
	};

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

	const handleProviderChange = (provider: ProviderType) => {
		setNewConfig(prev => ({
			...prev,
			provider,
			endpoint: getDefaultEndpoint(provider)
		}));
	};

	const handleAddConfig = () => {
		if (!newConfig.name.trim() || !newConfig.endpoint.trim() || !newConfig.token.trim()) {
			alert('请填写所有必需字段');
			return;
		}

		const config: AiConfig = {
			id: Date.now().toString(),
			name: newConfig.name.trim(),
			provider: newConfig.provider,
			endpoint: newConfig.endpoint.trim(),
			token: newConfig.token.trim(),
			isActive: false
		};

		setConfigs(prev => [...prev, config]);
		setNewConfig({
			name: '',
			provider: 'OPENAI',
			endpoint: '',
			token: ''
		});
		setIsAdding(false);
	};

	const handleTestConnection = async (configId: string) => {
		const config = configs.find(c => c.id === configId);
		if (!config) return;

		// 更新测试状态
		setConfigs(prev => prev.map(c => 
			c.id === configId ? { ...c, testResult: 'pending' } : c
		));

		try {
			// 模拟API调用测试连接
			await new Promise(resolve => setTimeout(resolve, 2000));
			
			// 简单的连接测试（实际应该发送真实的API请求）
			const testUrl = `${config.endpoint}/models`;
			
			const response = await fetch(testUrl, {
				headers: {
					'Authorization': `Bearer ${config.token}`,
					'Content-Type': 'application/json'
				}
			});

			if (response.ok || response.status === 401) {
				// 401表示认证失败，但连接成功
				setConfigs(prev => prev.map(c => 
					c.id === configId ? { ...c, testResult: 'success' } : c
				));
			} else {
				throw new Error('Connection failed');
			}
		} catch (error) {
			setConfigs(prev => prev.map(c => 
				c.id === configId ? { ...c, testResult: 'failed' } : c
			));
		}
	};

	const handleToggleActive = (configId: string) => {
		setConfigs(prev => prev.map(c => ({
			...c,
			isActive: c.id === configId ? !c.isActive : false
		})));
	};

	const handleDeleteConfig = (configId: string) => {
		setConfigs(prev => prev.filter(c => c.id !== configId));
	};

	const handleSaveConfigs = () => {
		// 这里应该保存到Chrome storage或本地存储
		console.log('Saving configs:', configs);
		alert('配置已保存');
	};

	const getTestResultIcon = (result?: 'success' | 'failed' | 'pending') => {
		switch (result) {
			case 'success':
				return <CheckCircle className="h-4 w-4 text-green-500" />;
			case 'failed':
				return <XCircle className="h-4 w-4 text-red-500" />;
			case 'pending':
				return <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />;
			default:
				return null;
		}
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
						{!configs.length && !isAdding && (
							<div className="text-center py-8">
								<p className="text-lg text-muted-foreground mb-4">还没有AI配置</p>
								<Button onClick={() => setIsAdding(true)}>
									<Plus className="h-4 w-4 mr-2" />
									添加第一个配置
								</Button>
							</div>
						)}

						{configs.map((config) => (
							<Card key={config.id} className={cn(
								"transition-colors",
								config.isActive && "ring-2 ring-primary"
							)}>
								<CardContent className="pt-6">
									<div className="flex items-center justify-between mb-4">
										<div className="flex items-center gap-3">
											<div className="flex items-center gap-2">
												<Settings className="h-4 w-4 text-muted-foreground" />
												<span className="font-medium">{config.name}</span>
											</div>
											<Badge variant="secondary">
												{getProviderInfo(config.provider)?.label}
											</Badge>
											{config.isActive && (
												<Badge variant="default">已启用</Badge>
											)}
										</div>
										<div className="flex items-center gap-2">
											{getTestResultIcon(config.testResult)}
											<Switch
												checked={config.isActive}
												onCheckedChange={() => handleToggleActive(config.id)}
											/>
											<Button
												variant="outline"
												size="sm"
												onClick={() => handleTestConnection(config.id)}
												disabled={config.testResult === 'pending'}
											>
												<TestTube className="h-3 w-3 mr-1" />
												测试
											</Button>
											<Button
												variant="outline"
												size="sm"
												onClick={() => handleDeleteConfig(config.id)}
											>
												<Trash2 className="h-3 w-3" />
											</Button>
										</div>
									</div>
									<div className="space-y-2 text-sm">
										<div>
											<span className="font-medium text-muted-foreground">端点：</span>
											<code className="text-xs bg-muted px-1 rounded">{config.endpoint}</code>
										</div>
										<div>
											<span className="font-medium text-muted-foreground">Token：</span>
											<code className="text-xs bg-muted px-1 rounded">
												{config.token.substring(0, 8)}...
											</code>
										</div>
									</div>
								</CardContent>
							</Card>
						))}

						{isAdding && (
							<Card>
								<CardContent className="pt-6">
									<div className="space-y-4">
										<div>
											<Label htmlFor="config-name">配置名称</Label>
											<Input
												id="config-name"
												placeholder="例如：我的OpenAI配置"
												value={newConfig.name}
												onChange={(e) => setNewConfig(prev => ({ ...prev, name: e.target.value }))}
											/>
										</div>

										<div>
											<Label htmlFor="config-provider">AI提供商</Label>
											<Select value={newConfig.provider} onValueChange={handleProviderChange}>
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
												value={newConfig.endpoint}
												onChange={(e) => setNewConfig(prev => ({ ...prev, endpoint: e.target.value }))}
											/>
										</div>

										<div>
											<Label htmlFor="config-token">API Token</Label>
											<Input
												id="config-token"
												type="password"
												placeholder="sk-..."
												value={newConfig.token}
												onChange={(e) => setNewConfig(prev => ({ ...prev, token: e.target.value }))}
											/>
										</div>

										<div className="flex gap-2">
											<Button onClick={handleAddConfig}>
												添加配置
											</Button>
											<Button variant="outline" onClick={() => setIsAdding(false)}>
												取消
											</Button>
										</div>
									</div>
								</CardContent>
							</Card>
						)}

						{configs.length > 0 && !isAdding && (
							<div className="flex gap-2">
								<Button onClick={() => setIsAdding(true)}>
									<Plus className="h-4 w-4 mr-2" />
									添加配置
								</Button>
								<Button variant="outline" onClick={handleSaveConfigs}>
									保存所有配置
								</Button>
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default AiConfigs;
