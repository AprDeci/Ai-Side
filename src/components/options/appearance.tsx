import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Palette, Monitor, Sun, Moon, Layout, Type } from "lucide-react";

const Appearance = () => {
	const [theme, setTheme] = useState("light");
	const [sidebarPosition, setSidebarPosition] = useState("right");
	const [sidebarWidth, setSidebarWidth] = useState("350px");
	const [fontSize, setFontSize] = useState("medium");
	const [accentColor, setAccentColor] = useState("blue");

	const colorSchemes = [
		{ id: "blue", name: "蓝色", color: "bg-blue-500" },
		{ id: "purple", name: "紫色", color: "bg-purple-500" },
		{ id: "green", name: "绿色", color: "bg-green-500" },
		{ id: "orange", name: "橙色", color: "bg-orange-500" },
		{ id: "pink", name: "粉色", color: "bg-pink-500" },
		{ id: "red", name: "红色", color: "bg-red-500" },
	];

	return (
		<div className="space-y-6">
			<div className="grid gap-6">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Monitor className="h-5 w-5" />
							主题设置
						</CardTitle>
						<CardDescription>
							选择界面主题和外观风格
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-3">
							<Label>主题模式</Label>
							<div className="grid grid-cols-3 gap-3">
								<div 
									className={`p-3 border rounded-lg cursor-pointer transition-all ${
										theme === 'light' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
									}`}
									onClick={() => setTheme("light")}
								>
									<div className="flex items-center gap-2 mb-2">
										<Sun className="h-4 w-4" />
										<span className="text-sm font-medium">浅色</span>
									</div>
									<div className="h-8 bg-gradient-to-r from-gray-50 to-gray-100 rounded border"></div>
								</div>
								
								<div 
									className={`p-3 border rounded-lg cursor-pointer transition-all ${
										theme === 'dark' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
									}`}
									onClick={() => setTheme("dark")}
								>
									<div className="flex items-center gap-2 mb-2">
										<Moon className="h-4 w-4" />
										<span className="text-sm font-medium">深色</span>
									</div>
									<div className="h-8 bg-gradient-to-r from-gray-800 to-gray-900 rounded border"></div>
								</div>
								
								<div 
									className={`p-3 border rounded-lg cursor-pointer transition-all ${
										theme === 'auto' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
									}`}
									onClick={() => setTheme("auto")}
								>
									<div className="flex items-center gap-2 mb-2">
										<Monitor className="h-4 w-4" />
										<span className="text-sm font-medium">跟随系统</span>
									</div>
									<div className="h-8 bg-gradient-to-r from-gray-200 to-gray-800 rounded border"></div>
								</div>
							</div>
						</div>

						<Separator />

						<div className="space-y-3">
							<Label>强调色</Label>
							<div className="grid grid-cols-6 gap-3">
								{colorSchemes.map((color) => (
									<div
										key={color.id}
										className={`p-2 border rounded-lg cursor-pointer transition-all ${
											accentColor === color.id ? 'border-gray-400 scale-110' : 'border-gray-200 hover:border-gray-300'
										}`}
										onClick={() => setAccentColor(color.id)}
									>
										<div className={`w-full h-8 ${color.color} rounded mb-1`}></div>
										<span className="text-xs text-center block">{color.name}</span>
									</div>
								))}
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Layout className="h-5 w-5" />
							侧边栏布局
						</CardTitle>
						<CardDescription>
							自定义侧边栏的位置和大小
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label>显示位置</Label>
							<Select value={sidebarPosition} onValueChange={setSidebarPosition}>
								<SelectTrigger>
									<SelectValue placeholder="选择侧边栏位置" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="right">右侧</SelectItem>
									<SelectItem value="left">左侧</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<Separator />

						<div className="space-y-2">
							<Label>宽度设置</Label>
							<Select value={sidebarWidth} onValueChange={setSidebarWidth}>
								<SelectTrigger>
									<SelectValue placeholder="选择侧边栏宽度" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="300px">300px (紧凑)</SelectItem>
									<SelectItem value="350px">350px (默认)</SelectItem>
									<SelectItem value="400px">400px (舒适)</SelectItem>
									<SelectItem value="450px">450px (宽屏)</SelectItem>
									<SelectItem value="custom">自定义</SelectItem>
								</SelectContent>
							</Select>
						</div>

						{sidebarWidth === "custom" && (
							<div className="space-y-2">
								<Label htmlFor="custom-width">自定义宽度 (px)</Label>
								<input
									id="custom-width"
									type="number"
									min="200"
									max="600"
									className="w-full p-2 border border-gray-200 rounded-md"
									placeholder="400"
								/>
							</div>
						)}

						<Separator />

						<div className="space-y-3">
							<Label>展开方式</Label>
							<div className="grid grid-cols-2 gap-3">
								<Button variant="outline" className="justify-start">
									滑动展开
								</Button>
								<Button variant="outline" className="justify-start">
									淡入淡出
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Type className="h-5 w-5" />
							字体与排版
						</CardTitle>
						<CardDescription>
							调整字体大小和样式
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label>字体大小</Label>
							<Select value={fontSize} onValueChange={setFontSize}>
								<SelectTrigger>
									<SelectValue placeholder="选择字体大小" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="small">小</SelectItem>
									<SelectItem value="medium">中</SelectItem>
									<SelectItem value="large">大</SelectItem>
									<SelectItem value="extra-large">超大</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<Separator />

						<div className="space-y-2">
							<Label>字体系列</Label>
							<Select defaultValue="system">
								<SelectTrigger>
									<SelectValue placeholder="选择字体" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="system">系统默认</SelectItem>
									<SelectItem value="sans">无衬线字体</SelectItem>
									<SelectItem value="serif">衬线字体</SelectItem>
									<SelectItem value="mono">等宽字体</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<Separator />

						<div className="space-y-3">
							<Label>行高设置</Label>
							<div className="grid grid-cols-3 gap-2">
								<Button variant="outline" size="sm">紧凑</Button>
								<Button variant="default" size="sm">正常</Button>
								<Button variant="outline" size="sm">宽松</Button>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Palette className="h-5 w-5" />
							动画效果
						</CardTitle>
						<CardDescription>
							控制界面动画和过渡效果
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label className="text-base">启用动画</Label>
								<p className="text-sm text-muted-foreground">
									控制所有界面动画的开关
								</p>
							</div>
							<input type="checkbox" defaultChecked className="toggle" />
						</div>

						<Separator />

						<div className="space-y-2">
							<Label>动画速度</Label>
							<Select defaultValue="normal">
								<SelectTrigger>
									<SelectValue placeholder="选择动画速度" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="fast">快速</SelectItem>
									<SelectItem value="normal">正常</SelectItem>
									<SelectItem value="slow">慢速</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<Separator />

						<div className="grid grid-cols-2 gap-3">
							<div className="flex items-center space-x-2">
								<input type="checkbox" id="slide-anim" defaultChecked />
								<Label htmlFor="slide-anim" className="text-sm">滑动动画</Label>
							</div>
							<div className="flex items-center space-x-2">
								<input type="checkbox" id="fade-anim" defaultChecked />
								<Label htmlFor="fade-anim" className="text-sm">淡入淡出</Label>
							</div>
							<div className="flex items-center space-x-2">
								<input type="checkbox" id="button-anim" defaultChecked />
								<Label htmlFor="button-anim" className="text-sm">按钮动效</Label>
							</div>
							<div className="flex items-center space-x-2">
								<input type="checkbox" id="loading-anim" defaultChecked />
								<Label htmlFor="loading-anim" className="text-sm">加载动画</Label>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default Appearance;