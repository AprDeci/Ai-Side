import { createOpenAI } from "@ai-sdk/openai";

export const customOpenAI = createOpenAI({
	apiKey: import.meta.env.WXT_SILICONCLOUD_KEY,
	baseURL: "https://api.siliconflow.cn/v1/",
});
