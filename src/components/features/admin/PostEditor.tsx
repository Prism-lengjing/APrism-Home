"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

interface PostEditorProps {
  content: string;
  onChange: (value: string) => void;
}

export function PostEditor({ content, onChange }: PostEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start writing your post...",
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="flex gap-1 p-2 border-b border-border bg-muted/50">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded ${editor.isActive("bold") ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
        >
          <strong>B</strong>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded ${editor.isActive("italic") ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
        >
          <em>I</em>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`p-2 rounded ${editor.isActive("code") ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
        >
          {"</>"}
        </button>
        <div className="w-px bg-border mx-1" />
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded ${editor.isActive("heading", { level: 2 }) ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded ${editor.isActive("heading", { level: 3 }) ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
        >
          H3
        </button>
        <div className="w-px bg-border mx-1" />
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded ${editor.isActive("bulletList") ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
        >
          • List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded ${editor.isActive("blockquote") ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
        >
          "Quote"
        </button>
      </div>
      <EditorContent
        editor={editor}
        className="prose prose-lg dark:prose-invert max-w-none p-4 min-h-[400px] focus:outline-none"
      />
    </div>
  );
}
