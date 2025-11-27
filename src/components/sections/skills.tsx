import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Code, Database, Layout, Wind, Zap, Server } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

const iconMap: Record<string, React.ReactNode> = {
  Code: <Code className="w-8 h-8" />,
  Layout: <Layout className="w-8 h-8" />,
  Wind: <Wind className="w-8 h-8" />,
  Database: <Database className="w-8 h-8" />,
  Zap: <Zap className="w-8 h-8" />,
  Server: <Server className="w-8 h-8" />,
};

export async function Skills() {
  const supabase = await createClient(cookies());

  const { data: skills } = await supabase
    .from("skills")
    .select("*")
    .order("created_at", { ascending: false });

  if (!skills || skills.length === 0) {
    return (
      <Section id="skills">
        <h2 className="text-3xl font-bold text-center mb-8">Skills</h2>
        <p className="text-center text-muted-foreground">No skills added yet.</p>
      </Section>
    );
  }

  return (
    <Section id="skills">
      <h2 className="text-3xl font-bold text-center mb-8">Skills</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {skills.map((skill) => (
          <Card key={skill.id} className="flex flex-col items-center text-center">
            <CardHeader>
              <div className="mb-4">{iconMap[skill.icon] || <Code className="w-8 h-8" />}</div>
              <CardTitle>{skill.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{skill.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
