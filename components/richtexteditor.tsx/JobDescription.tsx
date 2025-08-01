import {EditorContent, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export function JobDescription() {
    const editor = useEditor({
        extensions: [
            StarterKit
        ]
        immediatelyRender: false, 
    });

    return (
        <div className="w-full rounded-lg overflow-hidden bg-card">
            <EditorContent />
        </div>
    )
}