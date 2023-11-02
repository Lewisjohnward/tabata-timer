import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Viewport } from "next";
import { cookies } from "next/headers";
import PageSelector from "./pageSelector";

export const dynamic = "force-dynamic";

export const viewport: Viewport = {
  themeColor: "white",
};

export default async function Page() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase.from("workouts").select();

  return (
    <main className="relative min-h-full sm:h-[100dvh]">
      <PageSelector user={user?.email} data={data || []} />
    </main>
  );
}
