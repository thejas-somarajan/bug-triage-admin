import { Suspense } from "react"
import { MessagesContent } from "@/components/messages-content"

export default function Messages() {
  return (
    <Suspense fallback={null}>
      <MessagesContent />
    </Suspense>
  )
}
