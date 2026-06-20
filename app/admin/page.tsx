import { Suspense } from "react";
import AdminHomeEditor from "@/app/components/admin/AdminHomeEditor";
import { AdminLoading } from "@/app/components/admin/AdminTable";

export default function AdminHomePage() {
  return (
    <Suspense fallback={<AdminLoading />}>
      <AdminHomeEditor />
    </Suspense>
  );
}
