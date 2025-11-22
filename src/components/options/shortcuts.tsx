import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Keyboard, Globe, Search, Zap, MessageSquare } from "lucide-react";

const Shortcuts = () => {
	const [toggleSidebar, setToggleSidebar] = = useState("Ctrl+Shift+Space");
	const [quickChat, setQuickChat] = = useState("Ctrl+Shift+C");
	const [clearChat, setClearChat] = = useState("Ctrl+Shift+X");
	const [searchHistory, setSearchHistory] = = useState("Ctrl+Shift+H");
	const [enableGlobal, setEnableGlobal] = useState(true);

	return (
		<div className="space-y-6">
			<div className="grid gap-6">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Keyboard className="h-5 w-5" />
							全局快捷键
						</CardTitle>
						<CardDescription>
							设置用于快速访问扩展功能的快捷键
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label className="text-base">启用全局快捷键</Label>
								<p className="text-sm text-muted-foreground">
									在任何网页上使用快捷键激活扩展
								</p>
							</div>
							<input 
								type="checkbox" 
								checked={enableGlobal}
								onChange={(e) => setEnableGlobal(e.target.checked)}
								className="toggle" 
							/>
						</div>

						<Separator />

						<div className="space-y-4">
							<div className="grid grid-cols-2 gap-4 items-center">
								<div className="space-y-0.5">
									<Label className="text-sm">切换侧边栏</Label>
									<p className="text-xs text-muted-foreground">
										显示或隐藏 AI 侧边栏
									</p>
								</div>
								<div className="space-x-2">
									<Input
										value={toggleSidebar}
										onChange={(e) => setToggleSidebar(e.target.value)}
										className="font-mono"
									/>
									<Button variant="outline" size="sm">录制</Button>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4 items-center">
								<div className="space-y-0.5">
									<Label className="text-sm">快速聊天</Label>
									<p className="text-xs text-muted-foreground">
										直接开始新的聊天对话
									</p>
								</div>
								<div className="space-x-2">
									<Input
										value={quickChat}
										onChange={(e) => setQuickChat(e.target.value)}
										className="font-mono"
									/>
									<Button variant="outline" size="sm">录制</Button>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4 items-center">
								<div className="space-y-0.5">
									<Label className="text-sm">清空聊天</Label>
									<p className="text-xs text-muted-foreground">
										清除当前聊天记录
									</p>
								</div>
								<div className="space-x-2">
									<Input
										value={clearChat}
										onChange={(e) => setClearChat(e.target.value)}
										className="font-mono"
									/>
									<Button variant="outline" size="sm">录制</Button>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4 items-center">
								<div className="space-y-0.5">
									<Label className="text-sm">搜索历史</Label>
									<p className="text-xs text-muted-foreground">
										搜索历史聊天记录
									</p>
								</div>
								<div className="space-x-2">
									<Input
										value={searchHistory}
										onChange={(e) => setSearchHistory(e.target.value)}
										className="font-mono"
									/>
									<Button variant="outline" size="sm">录制</Button>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Search className="h-5 w-5" />
							网站特定快捷键
						</CardTitle>
						<CardDescription>
							为特定网站设置专用的快捷键
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-3">
							<div className="flex items-center justify-between p-3 border rounded-lg">
								<div className="flex items-center gap-3">
									<Globe className="h-4 w-4 text-blue-500" />
									<div>
										<p className="text-sm font-medium">github.com</p>
										<p className="text-xs text-muted-foreground">代码解释助手</p>
									</div>
								</div>
								<div className="flex items-center gap-2">
									<span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">G</span>
									<Button variant="ghost" size="sm">编辑</Button>
								</div>
							</div>

							<div className="flex items-center justify-between p-3 border rounded-lg">
								<div className="flex items-center gap-3">
									<Globe className="h-4 w-4 text-green-500" />
									<div>
										<p className="text-sm font-medium">stackoverflow.com</p>
										<p className="text-xs text-muted-foreground">答案优化助手</p>
									</div>
								</div>
								<div className="flex items-center gap-2">
									<span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">S</span>
									<Button variant="ghost" size="sm">编辑</Button>
								</div>
							</div>

							<Button variant="outline" className="w-full justify-start">
								+ 添加新网站快捷键
							</Button>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<MessageSquare className="h-5 w-5" />
							聊天快捷操作
						</CardTitle>
						<CardDescription>
							聊天界面内的快捷键设置
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label>发送消息</Label>
								<Select defaultValue="enter">
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="enter">Enter</SelectItem>
										<SelectItem value="ctrl-enter">Ctrl + Enter</SelectItem>
										<SelectItem value="shift-enter">Shift + Enter</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-2">
								<Label>换行</Label>
								<Select defaultValue="shift-enter">
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="enter">Enter</SelectItem>
										<SelectItem value="shift-enter">Shift + Enter</SelectItem>
										<SelectItem value="ctrl-enter">Ctrl + Enter</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>

						<Separator />

						<div className="space-y-3">
							<Label className="text-sm">其他快捷键</Label>
							<div className="grid gap-2">
								<div className="flex items-center justify-between text-sm">
									<span>复制最后回复</span>
									<code className="bg-gray-100 px-2 py-1 rounded">Ctrl+C</code>
								</div>
								<div className="flex items-center justify-between text-sm">
									<span>重新生成回复</span>
									<code className="bg-gray-100 px-2 py-1 rounded">Ctrl+R</code>
								</div>
								<div className="flex items-center justify-between text-sm">
									<span>停止生成</span>
									<code className="bg-gray-100 px-2 py-1 rounded">Esc</code>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default Shortcuts;