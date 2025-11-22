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
import { Settings, MessageSquare, Shield, Zap } from "lucide-react";

const General = () => {
	const [autoOpen, setAutoOpen] = useState(false);
	const [minimizeOnBlur, setMinimizeOnBlur] = useState(true);
	const [saveChatHistory, setSaveChatHistory] = useState(true);
	const [enableNotifications, setEnableNotifications] = useState(true);

	return (
		<div className="space-y-6">
			<div className="grid gap-6">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Settings className="h-5 w-5" />
							基本设置
						</CardTitle>
						<CardDescription>配置侧边栏的基本行为和功能</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label className="text-base">自动打开侧边栏</Label>
								<p className="text-sm text-muted-foreground">
									页面加载时自动打开侧边栏
								</p>
							</div>
							<Switch checked={autoOpen} onCheckedChange={setAutoOpen} />
						</div>

						<Separator />

						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label className="text-base">失焦时最小化</Label>
								<p className="text-sm text-muted-foreground">
									点击页面其他位置时自动收起侧边栏
								</p>
							</div>
							<Switch
								checked={minimizeOnBlur}
								onCheckedChange={setMinimizeOnBlur}
							/>
						</div>

						<Separator />

						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label className="text-base">保存聊天历史</Label>
								<p className="text-sm text-muted-foreground">
									在本地保存聊天记录，便于回顾
								</p>
							</div>
							<Switch
								checked={saveChatHistory}
								onCheckedChange={setSaveChatHistory}
							/>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Shield className="h-5 w-5" />
							隐私与安全
						</CardTitle>
						<CardDescription>管理您的数据和隐私设置</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label className="text-base">启用通知</Label>
								<p className="text-sm text-muted-foreground">
									接收 AI 回复的通知提醒
								</p>
							</div>
							<Switch
								checked={enableNotifications}
								onCheckedChange={setEnableNotifications}
							/>
						</div>

						<Separator />

						<div className="space-y-2">
							<Label>数据清理</Label>
							<p className="text-sm text-muted-foreground">
								清除所有保存的聊天记录和个人数据
							</p>
							<Button variant="outline" size="sm">
								清除所有数据
							</Button>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Zap className="h-5 w-5" />
							性能设置
						</CardTitle>
						<CardDescription>优化扩展的性能和响应速度</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="animation-speed">动画速度</Label>
							<select
								id="animation-speed"
								className="w-full p-2 border border-gray-200 rounded-md"
								defaultValue="normal"
							>
								<option value="fast">快速</option>
								<option value="normal">正常</option>
								<option value="slow">慢速</option>
								<option value="disabled">禁用动画</option>
							</select>
						</div>

						<Separator />

						<div className="space-y-2">
							<Label htmlFor="max-history">最大历史记录</Label>
							<Input
								id="max-history"
								type="number"
								defaultValue="100"
								min="10"
								max="1000"
							/>
							<p className="text-sm text-muted-foreground">
								本地保存的最大聊天记录数量
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default General;
