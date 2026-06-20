import { Suspense } from "react";
import AdminServicesEditor from "@/app/components/admin/AdminServicesEditor";
import { AdminLoading } from "@/app/components/admin/AdminTable";

export default function ServicesAdminPage() {
  return (
    <Suspense fallback={<AdminLoading />}>
      <AdminServicesEditor slug="services" />
    </Suspense>
  );
}
