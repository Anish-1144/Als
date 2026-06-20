import { Suspense } from "react";
import AdminCalculatorsEditor from "@/app/components/admin/AdminCalculatorsEditor";
import { AdminLoading } from "@/app/components/admin/AdminTable";

export default function CalculatorsAdminPage() {
  return (
    <Suspense fallback={<AdminLoading />}>
      <AdminCalculatorsEditor slug="calculator" />
    </Suspense>
  );
}
