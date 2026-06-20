import CrudResourceAdmin from "@/app/components/admin/CrudResourceAdmin";

export default function AdminDocumentsPage() {
  return (
    <CrudResourceAdmin
      title="Document"
      apiPath="/admin/documents"
      fields={[
        { key: "title", label: "Title" },
        { key: "description", label: "Description", type: "textarea", rows: 3 },
        { key: "link", label: "File URL" },
        {
          key: "category",
          label: "Category",
          type: "select",
          options: [
            { value: "home-loans", label: "Home Loans" },
            { value: "refinancing", label: "Refinancing" },
            { value: "commercial-loans", label: "Commercial Loans" },
            { value: "car-financing", label: "Car Financing" },
            { value: "smsf-financing", label: "SMSF Financing" },
            { value: "application-forms", label: "Application Forms" },
            { value: "guides-resources", label: "Guides & Resources" },
            { value: "general", label: "General" },
          ],
        },
        { key: "order", label: "Order", type: "number" },
        { key: "isActive", label: "Active", type: "checkbox" },
      ]}
      newDefaults={{
        title: "",
        link: "",
        category: "general",
        order: 0,
        isActive: true,
      }}
    />
  );
}
