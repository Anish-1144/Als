import CrudResourceAdmin from "@/app/components/admin/CrudResourceAdmin";

export default function AdminTestimonialsPage() {
  return (
    <CrudResourceAdmin
      title="Testimonial"
      apiPath="/admin/testimonials"
      fields={[
        { key: "clientName", label: "Client name" },
        { key: "clientTitle", label: "Client title" },
        { key: "clientImage", label: "Image URL" },
        { key: "testimonial", label: "Testimonial", type: "textarea", rows: 5 },
        { key: "rating", label: "Rating (1-5)", type: "number" },
        { key: "loanType", label: "Loan type" },
        { key: "order", label: "Order", type: "number" },
        { key: "featured", label: "Featured", type: "checkbox" },
        { key: "isActive", label: "Active", type: "checkbox" },
      ]}
      newDefaults={{
        clientName: "",
        testimonial: "",
        rating: 5,
        order: 0,
        featured: false,
        isActive: true,
      }}
    />
  );
}
