"use client";

import { openai } from "@ai-sdk/openai";
import { useChat } from "@ai-sdk/react";
import {
  convertToModelMessages,
  DefaultChatTransport,
  streamText,
  UIMessage
} from "ai";
import { useState } from "react";

const sendMessage = (message: UIMessage[]) => {
  const result = streamText({
    model: openai("gpt-3.5-turbo"),
    system: "You are a helpful assistant.",
    messages: convertToModelMessages(message)
  });

  return result.toUIMessageStreamResponse();
};

class CustomTransport implements DefaultChatTransport<UIMessage> {
  async send(
    messages: UIMessage[],
    abortSignal?: AbortSignal
  ): Promise<Response> {
    const uiMessages: UIMessage[] = messages as UIMessage[]; // 简单转换
    return sendMessage(uiMessages); // 直接调用你的方法！
  }
}

const chatContainer = () => {
  const { messages, sendMessage, status } = useChat({
    transport: new CustomTransport()
  });

  return <></>;
};

export default chatContainer;
