import { Suspense } from "react";
import AdminHowItWorksEditor from "@/app/components/admin/AdminHowItWorksEditor";
import { AdminLoading } from "@/app/components/admin/AdminTable";

export default function HowItWorksAdminPage() {
  return (
    <Suspense fallback={<AdminLoading />}>
      <AdminHowItWorksEditor />
    </Suspense>
  );
}
