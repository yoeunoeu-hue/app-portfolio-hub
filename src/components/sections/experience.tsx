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

export async function Experience() {
  const supabase = await createClient(cookies());

  const { data: experience } = await supabase
    .from("experience")
    .select("*")
    .order("start_date", { ascending: false });

  if (!experience || experience.length === 0) {
    return (
      <Section id="experience">
        <h2 className="text-3xl font-bold text-center mb-8">Experience</h2>
        <p className="text-center text-muted-foreground">No experience added yet.</p>
      </Section>
    );
  }

  return (
    <Section id="experience">
      <h2 className="text-3xl font-bold text-center mb-8">Experience</h2>
      <div className="space-y-8">
        {experience.map((exp) => (
          <Card key={exp.id}>
            <CardHeader>
              <CardTitle>{exp.role}</CardTitle>
              <CardDescription>
                {exp.company_name} | {new Date(exp.start_date).getFullYear()} - {exp.end_date ? new Date(exp.end_date).getFullYear() : 'Present'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {exp.responsibilities && exp.responsibilities.length > 0 && (
                <ul className="list-disc list-inside space-y-2">
                  {exp.responsibilities.map((resp: string, i: number) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
