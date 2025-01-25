import { createClient } from "../../utils/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/sign-in");
  }

  return (
    <main
      style={{
        background: "linear-gradient(145deg, #f5f7fa, #e4ebf5)",
      }}
    >
      {children}
    </main>
  );
}
