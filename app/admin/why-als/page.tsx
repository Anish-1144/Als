import { Suspense } from "react";
import AdminPageEditor from "@/app/components/admin/AdminPageEditor";
import { AdminLoading } from "@/app/components/admin/AdminTable";

export default function WhyAlsAdminPage() {
  return (
    <Suspense fallback={<AdminLoading />}>
      <AdminPageEditor slug="why-als" />
    </Suspense>
  );
}
