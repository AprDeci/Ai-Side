"use client";

import { customOpenAI } from "@/ai/customProvider";
import { openai } from "@ai-sdk/openai";
import { useChat as useChatOri } from "@ai-sdk/react";
import { useChat } from "@/hooks/useChat";
import { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CopyIcon, GlobeIcon, Loader, RefreshCcwIcon } from "lucide-react";
import { models } from "tokenlens";
import {
  PromptInput,
  PromptInputHeader,
  PromptInputAttachments,
  PromptInputAttachment,
  PromptInputBody,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputTools,
  PromptInputActionMenu,
  PromptInputActionMenuTrigger,
  PromptInputActionMenuContent,
  PromptInputActionAddAttachments,
  PromptInputButton,
  PromptInputSelect,
  PromptInputSelectTrigger,
  PromptInputSelectValue,
  PromptInputSelectContent,
  PromptInputSelectItem,
  PromptInputSubmit
} from "../ai-elements/prompt-input";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton
} from "../ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageActions,
  MessageAction
} from "../ai-elements/message";
import { MessageResponse } from "../ai/MessageResponse";
import {
  Reasoning,
  ReasoningTrigger,
  ReasoningContent
} from "../ai-elements/reasoning";
import {
  Sources,
  SourcesTrigger,
  SourcesContent,
  Source
} from "../ai-elements/sources";

const chatContainer = () => {
  const model = customOpenAI.chat("deepseek-ai/DeepSeek-V3");

  const { messages, sendMessage, status } = useChat(model);

  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input.trim()) {
      sendMessage({ text: input });
      setInput("");
    }
  };

  const regenerate = () => {};

  return (
    <>
      <div className="h-full">
        {
          <Conversation className="h-5/6">
            <ConversationContent>
              {messages.map((message) => (
                <div key={message.id}>
                  {message.role === "assistant" &&
                    message.parts.filter((part) => part.type === "source-url")
                      .length > 0 && (
                      <Sources>
                        <SourcesTrigger
                          count={
                            message.parts.filter(
                              (part) => part.type === "source-url"
                            ).length
                          }
                        />
                        {message.parts
                          .filter((part) => part.type === "source-url")
                          .map((part, i) => (
                            <SourcesContent key={`${message.id}-${i}`}>
                              <Source
                                key={`${message.id}-${i}`}
                                href={part.url}
                                title={part.url}
                              />
                            </SourcesContent>
                          ))}
                      </Sources>
                    )}
                  {message.parts.map((part, i) => {
                    switch (part.type) {
                      case "text":
                        return (
                          <Message
                            key={`${message.id}-${i}`}
                            from={message.role}>
                            <MessageContent>
                              <MessageResponse>{part.text}</MessageResponse>
                            </MessageContent>
                            {message.role === "assistant" &&
                              i === messages.length - 1 && (
                                <MessageActions>
                                  <MessageAction
                                    onClick={() => regenerate()}
                                    label="Retry">
                                    <RefreshCcwIcon className="size-3" />
                                  </MessageAction>
                                  <MessageAction
                                    onClick={() =>
                                      navigator.clipboard.writeText(part.text)
                                    }
                                    label="Copy">
                                    <CopyIcon className="size-3" />
                                  </MessageAction>
                                </MessageActions>
                              )}
                          </Message>
                        );
                      case "reasoning":
                        return (
                          // <Reasoning
                          //   key={`${message.id}-${i}`}
                          //   className="w-full"
                          //   isStreaming={
                          //     status === "streaming" &&
                          //     i === message.parts.length - 1 &&
                          //     message.id === messages.at(-1)?.id
                          //   }>
                          //   <ReasoningTrigger />
                          //   <ReasoningContent>{part.text}</ReasoningContent>
                          // </Reasoning>
                          <></>
                        );
                      default:
                        return null;
                    }
                  })}
                </div>
              ))}
              {status === "submitted" && <Loader />}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>
        }

        {
          <PromptInput
            onSubmit={handleSubmit}
            className="mt-4"
            globalDrop
            multiple>
            {/* <PromptInputHeader>
              <PromptInputAttachments>
                {(attachment) => <PromptInputAttachment data={attachment} />}
              </PromptInputAttachments>
            </PromptInputHeader> */}
            <PromptInputBody>
              <PromptInputTextarea
                onChange={(e) => setInput(e.target.value)}
                value={input}
              />
            </PromptInputBody>
            <PromptInputFooter>
              <PromptInputTools>
                <PromptInputActionMenu>
                  <PromptInputActionMenuTrigger />
                  <PromptInputActionMenuContent>
                    <PromptInputActionAddAttachments />
                  </PromptInputActionMenuContent>
                </PromptInputActionMenu>
              </PromptInputTools>
              <PromptInputSubmit disabled={!input && !status} status={status} />
            </PromptInputFooter>
          </PromptInput>
        }
      </div>
    </>
  );
};

export default chatContainer;
