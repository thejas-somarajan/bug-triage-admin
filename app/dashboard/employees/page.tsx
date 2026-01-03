import { Suspense } from "react"
import { EmployeesContent } from "@/components/employees-content"

export default function Employees() {
  return (
    <Suspense fallback={null}>
      <EmployeesContent />
    </Suspense>
  )
}
