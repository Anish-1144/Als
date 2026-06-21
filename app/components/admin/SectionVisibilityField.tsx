"use client";

import { AdminSectionVisibilityToggle } from "@/app/components/admin/AdminForm";

export default function SectionVisibilityField({
  visible,
  onChange,
}: {
  visible: boolean;
  onChange: (visible: boolean) => void;
}) {
  return (
    <div className="mb-6">
      <AdminSectionVisibilityToggle visible={visible} onChange={onChange} />
      {!visible && (
        <p className="mt-2 text-xs font-medium text-amber-600">
          Hidden on the live site until you turn this back on and save.
        </p>
      )}
    </div>
  );
}
