import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Home from "./pages/home";
import { cookies } from "next/headers";

export default async function Page() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase.from("workouts").select();

  return (
    <main className="relative min-h-full">
      <Home user={user?.email} data={data || []} />
    </main>
  );
}
