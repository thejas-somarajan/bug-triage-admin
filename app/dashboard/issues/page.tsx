import { Suspense } from "react"
import { IssueAssignmentContent } from "@/components/issue-assignment-content"

export default function IssueAssignment() {
  return (
    <Suspense fallback={null}>
      <IssueAssignmentContent />
    </Suspense>
  )
}
