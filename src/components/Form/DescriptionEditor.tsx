"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { TextStyle, FontSize } from "@tiptap/extension-text-style";
import { useEffect, useRef, useState } from "react";
import {
  DESCRIPTION_MAX_CHARS,
  looksLikeHtml,
  sanitizeDescriptionHtmlSync,
  stripDescriptionHtml,
} from "@/utils/descriptionHtml";

type DescriptionEditorProps = {
  value: string;
  onChange: (html: string, plainTextLength: number) => void;
  placeholder?: string;
};

const FONT_SIZES = [
  { label: "Small", value: "12px" },
  { label: "Normal", value: "14px" },
  { label: "Bigger", value: "18px" },
] as const;

type FontSizeValue = (typeof FONT_SIZES)[number]["value"];

function toEditorHtml(value: string): string {
  if (!value?.trim()) return "";
  if (looksLikeHtml(value)) return sanitizeDescriptionHtmlSync(value);
  // Preserve existing plain-text descriptions (line breaks) when editing
  return value
    .split(/\n{2,}/)
    .map((block) => `<p>${block.replace(/\n/g, "<br>")}</p>`)
    .join("");
}

function getActiveFontSize(editor: {
  getAttributes: (name: string) => Record<string, unknown>;
}): FontSizeValue {
  const current = String(editor.getAttributes("textStyle").fontSize || "");
  const matched = FONT_SIZES.find((size) => size.value === current);
  return matched?.value ?? "14px";
}

export default function DescriptionEditor({
  value,
  onChange,
  placeholder = "Write land highlights, approvals, road access, and nearby landmarks.",
}: DescriptionEditorProps) {
  const lastEmittedHtml = useRef<string>(value || "");
  const [, setToolbarTick] = useState(0);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [3, 4] },
        code: false,
        codeBlock: false,
        blockquote: false,
        horizontalRule: false,
      }),
      TextStyle,
      FontSize,
      Placeholder.configure({ placeholder }),
    ],
    content: toEditorHtml(value),
    editorProps: {
      attributes: {
        class: "description-editor__content",
      },
    },
    onUpdate: ({ editor: current }) => {
      const plain = current.getText();
      if (plain.length > DESCRIPTION_MAX_CHARS) {
        return;
      }
      const html = current.isEmpty
        ? ""
        : sanitizeDescriptionHtmlSync(current.getHTML());
      lastEmittedHtml.current = html;
      onChange(html, plain.length);
    },
  });

  // Keep toolbar (font size dropdown) in sync with caret/selection
  useEffect(() => {
    if (!editor) return;
    const refreshToolbar = () => setToolbarTick((tick) => tick + 1);
    editor.on("selectionUpdate", refreshToolbar);
    editor.on("transaction", refreshToolbar);
    return () => {
      editor.off("selectionUpdate", refreshToolbar);
      editor.off("transaction", refreshToolbar);
    };
  }, [editor]);

  // Sync when form value is loaded asynchronously (edit mode)
  useEffect(() => {
    if (!editor) return;

    const incomingPlain = stripDescriptionHtml(value || "");
    const currentPlain = editor.getText().trim();
    const nextHtml = toEditorHtml(value);

    // Hydrate empty editor from loaded property description
    if (incomingPlain && !currentPlain) {
      lastEmittedHtml.current = nextHtml;
      editor.commands.setContent(nextHtml, { emitUpdate: false });
      if (nextHtml !== (value || "")) {
        onChange(nextHtml, incomingPlain.length);
      }
      return;
    }

    if ((value || "") === (lastEmittedHtml.current || "")) return;
    if (nextHtml === lastEmittedHtml.current) return;
    if (editor.isFocused) return;

    lastEmittedHtml.current = nextHtml;
    editor.commands.setContent(nextHtml || "", { emitUpdate: false });
  }, [editor, value, onChange]);

  if (!editor) return null;

  const activeFontSize = getActiveFontSize(editor);

  const handleFontSizeChange = (size: string) => {
    if (size === "14px") {
      editor.chain().focus().unsetFontSize().run();
      return;
    }
    editor.chain().focus().setFontSize(size).run();
  };

  return (
    <div className="description-editor">
      <div className="description-editor__toolbar">
        <select
          className="description-editor__font-size"
          value={activeFontSize}
          onChange={(e) => handleFontSizeChange(e.target.value)}
          aria-label="Text size"
          title="Text size"
        >
          {FONT_SIZES.map((size) => (
            <option key={size.value} value={size.value}>
              {size.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          Heading
        </button>
        <button
          type="button"
          className={editor.isActive("bold") ? "is-active" : ""}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          Bold
        </button>
        <button
          type="button"
          className={editor.isActive("bulletList") ? "is-active" : ""}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          Bullets
        </button>
        <button
          type="button"
          className={editor.isActive("orderedList") ? "is-active" : ""}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          Numbered
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
