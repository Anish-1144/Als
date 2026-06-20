import { Suspense } from "react";
import AdminContactEditor from "@/app/components/admin/AdminContactEditor";
import { AdminLoading } from "@/app/components/admin/AdminTable";

export default function ContactAdminPage() {
  return (
    <Suspense fallback={<AdminLoading />}>
      <AdminContactEditor />
    </Suspense>
  );
}
