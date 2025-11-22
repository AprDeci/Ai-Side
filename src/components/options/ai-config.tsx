import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, Key, MessageCircle, Zap, FileText } from "lucide-react";

const AIConfig = () => {
	const [apiKey, setApiKey] = useState("");
	const [selectedModel, setSelectedModel] = useState("gpt-3.5-turbo");
	const [temperature, setTemperature] = useState(0.7);
	const [maxTokens, setMaxTokens] = useState(2000);
	const [systemPrompt, setSystemPrompt] = useState("你是一个有用的AI助手。");

	return (
		<div className="space-y-6">
			<div className="grid gap-6">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Key className="h-5 w-5" />
							API 配置
						</CardTitle>
						<CardDescription>
							配置您的 AI 服务 API 设置
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="api-key">API 密钥</Label>
							<Input
								id="api-key"
								type="password"
								placeholder="输入您的 API 密钥"
								value={apiKey}
								onChange={(e) => setApiKey(e.target.value)}
							/>
							<p className="text-sm text-muted-foreground">
								您的 API 密钥将安全存储在本地
							</p>
						</div>

						<Separator />

						<div className="space-y-2">
							<Label>API 端点</Label>
							<Select defaultValue="openai">
								<SelectTrigger>
									<SelectValue placeholder="选择 API 提供商" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="openai">OpenAI</SelectItem>
									<SelectItem value="anthropic">Anthropic</SelectItem>
									<SelectItem value="custom">自定义</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							<Label htmlFor="api-endpoint">自定义端点</Label>
							<Input
								id="api-endpoint"
								placeholder="https://api.openai.com/v1"
								disabled
							/>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Brain className="h-5 w-5" />
							模型设置
						</CardTitle>
						<CardDescription>
							选择和配置 AI 模型参数
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label>AI 模型</Label>
							<Select value={selectedModel} onValueChange={setSelectedModel}>
								<SelectTrigger>
									<SelectValue placeholder="选择 AI 模型" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="gpt-4">GPT-4</SelectItem>
									<SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
									<SelectItem value="claude-3">Claude 3</SelectItem>
									<SelectItem value="custom">自定义模型</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<Separator />

						<div className="space-y-2">
							<Label htmlFor="temperature">创造性 (Temperature): {temperature}</Label>
							<input
								id="temperature"
								type="range"
								min="0"
								max="2"
								step="0.1"
								value={temperature}
								onChange={(e) => setTemperature(parseFloat(e.target.value))}
								className="w-full"
							/>
							<div className="flex justify-between text-xs text-muted-foreground">
								<span>精确</span>
								<span>平衡</span>
								<span>创造</span>
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="max-tokens">最大回复长度</Label>
							<Input
								id="max-tokens"
								type="number"
								value={maxTokens}
								onChange={(e) => setMaxTokens(parseInt(e.target.value))}
								min="100"
								max="8000"
							/>
							<p className="text-sm text-muted-foreground">
								AI 回复的最大令牌数
							</p>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<FileText className="h-5 w-5" />
							系统提示词
						</CardTitle>
						<CardDescription>
							定义 AI 助手的角色和行为
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="system-prompt">系统提示</Label>
							<Textarea
								id="system-prompt"
								placeholder="你是一个有用的 AI 助手..."
								value={systemPrompt}
								onChange={(e) => setSystemPrompt(e.target.value)}
								rows={4}
							/>
							<p className="text-sm text-muted-foreground">
								这个提示词将作为 AI 的系统指令，影响所有回复
							</p>
						</div>

						<Separator />

						<div className="space-y-2">
							<Label>预设模板</Label>
							<div className="grid grid-cols-2 gap-2">
								<Button variant="outline" size="sm">
									通用助手
								</Button>
								<Button variant="outline" size="sm">
									代码助手
								</Button>
								<Button variant="outline" size="sm">
									学习伙伴
								</Button>
								<Button variant="outline" size="sm">
									创意写作
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<MessageCircle className="h-5 w-5" />
							聊天行为
						</CardTitle>
						<CardDescription>
							自定义聊天的交互方式
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label>新对话触发</Label>
							<Select defaultValue="explicit">
								<SelectTrigger>
									<SelectValue placeholder="选择触发方式" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="explicit">明确开始</SelectItem>
									<SelectItem value="auto">自动开始</SelectItem>
									<SelectItem value="context">根据上下文</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<Separator />

						<div className="space-y-2">
							<Label>回复显示</Label>
							<Select defaultValue="stream">
								<SelectTrigger>
									<SelectValue placeholder="选择显示方式" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="stream">流式显示</SelectItem>
									<SelectItem value="complete">完整显示</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<Separator />

						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label className="text-base">显示思考过程</Label>
								<p className="text-sm text-muted-foreground">
									显示 AI 的推理过程（如果支持）
								</p>
							</div>
							<input type="checkbox" className="toggle" />
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default AIConfig;