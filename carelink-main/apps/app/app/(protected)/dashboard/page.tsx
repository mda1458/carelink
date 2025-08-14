import { redirect } from "next/navigation";
import { allowed, currentUser } from "../../../src/lib/auth";
export default async function DashboardPage() {
  const user = await currentUser();
  if (!allowed(user.role, ["admin", "employer", "clinician"])) {
    redirect("/login?returnTo=/protected/dashboard");
  }
  return (
    <main style={{ padding: 24 }}>
      <h1>Dashboard</h1>
      <p>Welcome, {user.role}</p>
    </main>
  );
}
