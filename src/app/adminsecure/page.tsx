import { redirect } from "next/navigation";

export default function AdminSecureRedirect() {
  redirect("/admin/login");
}
