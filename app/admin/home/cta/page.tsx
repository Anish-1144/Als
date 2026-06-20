import { redirect } from "next/navigation";

export default function AdminHomeCtaRedirect() {
  redirect("/admin?section=cta");
}
