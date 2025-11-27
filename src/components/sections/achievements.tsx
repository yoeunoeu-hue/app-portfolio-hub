import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export async function Achievements() {
  const supabase = await createClient(cookies());

  const { data: achievements } = await supabase
    .from("achievements")
    .select("*")
    .order("date", { ascending: false });

  if (!achievements || achievements.length === 0) {
    return null;
  }

  return (
    <Section id="achievements">
      <h2 className="text-3xl font-bold text-center mb-8">Achievements</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {achievements.map((achievement) => (
          <Link href={`/achievements/${achievement.slug}`} key={achievement.id}>
            <Card className="transform transition-transform duration-300 hover:scale-105">
              <CardHeader>
                <CardTitle>{achievement.title}</CardTitle>
                <CardDescription>{achievement.description}</CardDescription>
                <p className="text-sm text-muted-foreground pt-2">
                  {new Date(achievement.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </Section>
  );
}
