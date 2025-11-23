import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
	TestTube,
	Trash2,
	CheckCircle,
	XCircle,
	Loader2,
	Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ConfigItemProps {
	config: ConfigTypes.AiConfig;
	onToggleActive: (id: string) => void;
	onTestConnection: (id: string) => void;
	onDeleteConfig: (id: string) => void;
}

const providerInfo = {
	OPENAI: { label: "OpenAI", description: "GPT模型API" },
	CLAUDE: { label: "Claude", description: "Anthropic Claude API" },
	GEMINI: { label: "Gemini", description: "Google Gemini API" },
};

export const ConfigItem = ({
	config,
	onToggleActive,
	onTestConnection,
	onDeleteConfig,
}: ConfigItemProps) => {
	const getTestResultIcon = (result?: "success" | "failed" | "pending") => {
		switch (result) {
			case "success":
				return <CheckCircle className="h-4 w-4 text-green-500" />;
			case "failed":
				return <XCircle className="h-4 w-4 text-red-500" />;
			case "pending":
				return <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />;
			default:
				return null;
		}
	};

	const provider = providerInfo[config.provider];

	return (
		<div
			className={cn(
				"transition-colors rounded-lg border p-4",
				config.isActive && "ring-2 ring-primary bg-muted/50",
			)}
		>
			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center gap-3">
					<div className="flex items-center gap-2">
						<Settings className="h-4 w-4 text-muted-foreground" />
						<span className="font-medium">{config.name}</span>
					</div>
					<Badge variant="secondary">{provider.label}</Badge>
					{config.isActive && <Badge variant="default">已启用</Badge>}
				</div>
				<div className="flex items-center gap-2">
					{getTestResultIcon(config.testResult)}
					<Switch
						checked={config.isActive}
						onCheckedChange={() => onToggleActive(config.id)}
					/>
					<Button
						variant="outline"
						size="sm"
						onClick={() => onTestConnection(config.id)}
						disabled={config.testResult === "pending"}
					>
						<TestTube className="h-3 w-3 mr-1" />
						测试
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => onDeleteConfig(config.id)}
					>
						<Trash2 className="h-3 w-3" />
					</Button>
				</div>
			</div>
			<div className="space-y-2 text-sm">
				<div>
					<span className="font-medium text-muted-foreground">端点：</span>
					<code className="text-xs bg-muted px-1 rounded">
						{config.endpoint}
					</code>
				</div>
				<div>
					<span className="font-medium text-muted-foreground">Token：</span>
					<code className="text-xs bg-muted px-1 rounded">
						{config.token.substring(0, 8)}...
					</code>
				</div>
			</div>
		</div>
	);
};
