import CrudResourceAdmin from "@/app/components/admin/CrudResourceAdmin";
import DocumentsLibraryTab from "@/app/components/admin/resources/DocumentsLibraryTab";

/** Standalone document manager — same UI as Resources → Documents → Items tab */
export default function AdminDocumentsPage() {
  return (
    <div>
      <DocumentsLibraryTab />
    </div>
  );
}
