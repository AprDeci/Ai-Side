import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import { memo, useMemo } from "react";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const headingBase = "mt-6 text-foreground first:mt-0";

const defaultComponents: Components = {
  h1: ({ node: _node, className, ...props }) => (
    <h1
      className={cn(
        headingBase,
        "mb-2 text-2xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h2: ({ node: _node, className, ...props }) => (
    <h2
      className={cn(
        headingBase,
        "mb-2 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h3: ({ node: _node, className, ...props }) => (
    <h3
      className={cn(
        headingBase,
        "mb-2 text-lg font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h4: ({ node: _node, className, ...props }) => (
    <h4
      className={cn(
        headingBase,
        "mb-2 text-base font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  p: ({ node: _node, className, ...props }) => (
    <p
      className={cn("mb-4 leading-6 text-foreground last:mb-0", className)}
      {...props}
    />
  ),
  a: ({ node: _node, className, ...props }) => (
    <a
      className={cn(
        "text-primary underline underline-offset-2 transition hover:text-primary/80",
        className
      )}
      {...props}
    />
  ),
  ul: ({ node: _node, className, ...props }) => (
    <ul
      className={cn(
        "mb-4 list-disc space-y-2 pl-6 text-foreground last:mb-0",
        className
      )}
      {...props}
    />
  ),
  ol: ({ node: _node, className, ...props }) => (
    <ol
      className={cn(
        "mb-4 list-decimal space-y-2 pl-6 text-foreground last:mb-0",
        className
      )}
      {...props}
    />
  ),
  li: ({ node: _node, className, ...props }) => (
    <li className={cn("leading-6 text-foreground", className)} {...props} />
  ),
  blockquote: ({ node: _node, className, ...props }) => (
    <blockquote
      className={cn(
        "my-4 border-l-2 border-border pl-4 text-muted-foreground",
        className
      )}
      {...props}
    />
  ),
  table: ({ node: _node, className, ...props }) => (
    <div className="my-4 w-full overflow-x-auto">
      <table
        className={cn(
          "w-full border-collapse text-sm [&_th]:text-left [&_th]:font-medium",
          className
        )}
        {...props}
      />
    </div>
  ),
  th: ({ node: _node, className, ...props }) => (
    <th
      className={cn(
        "border border-border bg-muted px-3 py-2 text-left font-semibold text-foreground",
        className
      )}
      {...props}
    />
  ),
  td: ({ node: _node, className, ...props }) => (
    <td
      className={cn(
        "border border-border px-3 py-2 text-foreground",
        className
      )}
      {...props}
    />
  ),
  code: ({ node: _node, className, children, inline, ...props }) => {
    const languageMatch = /language-(\w+)/.exec(className ?? "");

    if (!inline) {
      return (
        <pre
          className={cn(
            "mb-4 overflow-x-auto rounded-md bg-secondary p-4 text-sm"
          )}>
          <code
            className={cn(
              "font-mono text-foreground",
              languageMatch ? `language-${languageMatch[1]}` : null
            )}
            {...props}>
            {children}
          </code>
        </pre>
      );
    }

    return (
      <code
        className={cn(
          "rounded bg-secondary px-1.5 py-0.5 font-mono text-sm text-foreground",
          className
        )}
        {...props}>
        {children}
      </code>
    );
  }
};

export type MessageResponseProps = ComponentProps<typeof ReactMarkdown>;

export const MessageResponse = memo(
  ({
    className,
    components,
    remarkPlugins,
    ...props
  }: MessageResponseProps) => {
    const mergedComponents = useMemo(
      () => ({
        ...defaultComponents,
        ...components
      }),
      [components]
    );

    return (
      <div
        className={cn(
          "size-full leading-6 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
          className
        )}>
        <ReactMarkdown
          components={mergedComponents}
          remarkPlugins={remarkPlugins ?? [remarkGfm]}
          {...props}
        />
      </div>
    );
  },
  (prev, next) => prev.children === next.children
);

MessageResponse.displayName = "MessageResponse";
