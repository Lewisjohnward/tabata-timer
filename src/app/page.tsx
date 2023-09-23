import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import PageSelector from "./pageSelector";

export default async function Page() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase.from("workouts").select();

  return (
    <main className="relative min-h-full">
      <PageSelector user={user?.email} data={data || []} />
    </main>
  );
}
