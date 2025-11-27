import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export async function Education() {
  const supabase = await createClient(cookies());

  const { data: education } = await supabase
    .from("education")
    .select("*")
    .order("end_date", { ascending: false });

  if (!education || education.length === 0) {
    return (
      <Section id="education">
        <h2 className="text-3xl font-bold text-center mb-8">Education</h2>
        <p className="text-center text-muted-foreground">No education added yet.</p>
      </Section>
    );
  }

  return (
    <Section id="education">
      <h2 className="text-3xl font-bold text-center mb-8">Education</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {education.map((edu) => (
          <Card key={edu.id}>
            <CardHeader>
              <CardTitle>{edu.institution_name}</CardTitle>
              <CardDescription>
                {edu.degree} in {edu.field_of_study}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {new Date(edu.start_date).getFullYear()} - {new Date(edu.end_date).getFullYear()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
