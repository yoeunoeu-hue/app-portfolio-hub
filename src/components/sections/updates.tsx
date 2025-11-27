import { Section } from "@/components/ui/section";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export async function Updates() {
  const supabase = await createClient(cookies());

  const { data: updates } = await supabase
    .from("updates")
    .select("*")
    .order("created_at", { ascending: false });

  if (!updates || updates.length === 0) {
    return (
      <Section id="updates">
        <h2 className="text-3xl font-bold text-center mb-8">Recent Updates</h2>
        <p className="text-center text-muted-foreground">No updates added yet.</p>
      </Section>
    );
  }

  return (
    <Section id="updates">
      <h2 className="text-3xl font-bold text-center mb-8">Recent Updates</h2>
      <div className="space-y-4">
        {updates.map((update) => (
          <Card key={update.id}>
            <CardHeader>
              <CardDescription>
                {new Date(update.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{update.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
