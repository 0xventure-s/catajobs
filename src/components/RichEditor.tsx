"use client"

import { cn } from "@/lib/utils"
import dynamic from "next/dynamic"
import { forwardRef } from "react"
import { EditorProps } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

const Editor = dynamic(
    () => import("react-draft-wysiwyg").then(mod => mod.Editor),
    { ssr: false },
)

export default forwardRef<Object, EditorProps>(function RichText(props, ref) {
    return <Editor 
        {...props}
        editorClassName={cn(
            "border rounded-md px-3 min-h-[150px] cursor-text ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
            props.editorClassName
        )}
        toolbar={{
            options: ["inline", "fontSize", "list", "textAlign", "link", "emoji", "history"],
            inline: {
                options: ["bold", "italic", "underline"],
            },
            fontSize: {
                options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48],
            },
            textAlign: {
                options: ["left", "center", "right", "justify"],
            },
            emoji: {
                emojis: [
                    '😀', '😁', '😂', '😃', '😉', '😋', '😎', '😍', '😗', '🤗', '🤔', '😣', '😫', '😴', '😌', '🤓',
                    '😛', '😜', '😠', '😇', '😷', '😈', '👻', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '🙈', '🙉', '🙊',
                    '👼', '👮', '🕵', '💂', '👳', '🎅', '👸', '👰', '👲', '🙍', '🙇', '🚶', '🏃', '💃',
                    '⛷', '🏂', '🏌', '🏄', '🚣', '🏊', '⛹', '🏋', '🚴', '👫', '💪', '👈', '👉', '👉', '👆', '🖕', '👇',
                    '🖖', '🤘', '🖐', '👌', '👍', '👎', '✊', '👊', '👏', '🙌', '🙏', '🐵', '🐶', '🐇', '🐥', '🐸', '🐌', '🐛', '🐜',
                    '🐝', '🍉', '🍄', '🍔', '🍤', '🍨', '🍪', '🎂', '🍰', '🍾', '🍷', '🍸', '🍺', '🌍', '🚑', '⏰', '🌙', '🌝', '🌞',
                    '⭐', '🌟', '🌠', '🌨', '🌩', '⛄', '🔥', '🎄', '🎈', '🎉', '🎊', '🎁', '🎗', '🏀', '🏈', '🎲', '🔇', '🔈', '📣',
                    '🔔', '🎵', '🎷', '💰', '🖊', '📅', '✅', '❎', '💯',
                ],
            },
        }}
        editorRef={(r) => {
            if (typeof ref === "function") {
                ref(r)
            } else if (ref) {
                ref.current = r;
            }
        }}
      
    />
})