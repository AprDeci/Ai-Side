"use client";

import { openai } from "@ai-sdk/openai";
import { useChat } from "@ai-sdk/react";
import {
  ChatTransport,
  convertToModelMessages,
  DefaultChatTransport,
  HttpChatTransport,
  HttpChatTransportInitOptions,
  streamText,
  TextStreamPart,
  ToolSet,
  UIMessage,
  UIMessageChunk,
  uiMessageChunkSchema
} from "ai";
import { parseJsonEventStream, ParseResult } from "@ai-sdk/provider-utils";
import { useState } from "react";

const customFetch = async (
  _input: RequestInfo | URL,
  init?: RequestInit | undefined
) => {
  const m = JSON.parse(init?.body as string);
  const result = streamText({
    model: openai("gpt-3.5-turbo"),
    messages: convertToModelMessages(m.messages),
    abortSignal: init?.signal as AbortSignal | undefined
  });

  return result.toUIMessageStreamResponse();
};

const chatContainer = () => {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      fetch: customFetch
    })
  });

  const [input, setInput] = useState("");

  return (
    <>
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
