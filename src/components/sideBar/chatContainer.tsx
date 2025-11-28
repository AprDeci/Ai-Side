"use client";

import { customOpenAI } from "@/ai/customProvider";
import { openai } from "@ai-sdk/openai";
import { useChat as useChatOri } from "@ai-sdk/react";
import { useChat } from "@/hooks/useChat";
import { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const chatContainer = () => {
  const model = customOpenAI.chat("deepseek-ai/DeepSeek-V3");

  const { messages, sendMessage, status } = useChat(model);

  const [input, setInput] = useState("");

  const markdown = `Just a link: www.nasa.gov.`;

  return (
    <>
      <div>
        <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
      </div>
      {messages.map((message) => (
        <div key={message.id}>
          {message.role === "user" ? "User: " : "AI: "}
          {message.parts.map((part, index) =>
            part.type === "text" ? <span key={index}>{part.text}</span> : null
          )}
        </div>
      ))}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim()) {
            sendMessage({ text: input });
            setInput("");
          }
        }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={status !== "ready"}
          placeholder="Say something..."
        />
        <button type="submit" disabled={status !== "ready"}>
          Submit
        </button>
      </form>
    </>
  );
};

export default chatContainer;
