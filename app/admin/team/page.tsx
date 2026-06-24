import CrudResourceAdmin from "@/app/components/admin/CrudResourceAdmin";

export default function AdminTeamPage() {
  return (
    <CrudResourceAdmin
      title="Team member"
      apiPath="/admin/team"
      fields={[
        { key: "name", label: "Name" },
        { key: "title", label: "Title" },
        {
          key: "image",
          label: "Photo",
          type: "image",
          imageFolder: "als/team",
          imageHint: "Upload a professional headshot for this team member.",
        },
        { key: "bio", label: "Bio", type: "textarea", rows: 5 },
        { key: "experience", label: "Experience" },
        { key: "phone", label: "Phone" },
        { key: "email", label: "Email" },
        { key: "linkedin", label: "LinkedIn URL" },
        { key: "order", label: "Order", type: "number" },
        { key: "showOnHomepage", label: "Show on homepage", type: "checkbox" },
        { key: "isActive", label: "Active", type: "checkbox" },
      ]}
      newDefaults={{
        name: "",
        order: 0,
        showOnHomepage: false,
        isActive: true,
      }}
    />
  );
}
