import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Code, Database, Layout, Wind } from "lucide-react";

const skillsData = [
  {
    name: "TypeScript",
    description: "Building scalable and type-safe applications.",
    icon: <Code className="w-8 h-8" />,
  },
  {
    name: "Next.js",
    description: "Creating fast and modern server-rendered React apps.",
    icon: <Layout className="w-8 h-8" />,
  },
  {
    name: "TailwindCSS",
    description: "Rapidly building custom user interfaces.",
    icon: <Wind className="w-8 h-8" />,
  },
  {
    name: "Supabase",
    description: "Handling database, authentication, and storage with ease.",
    icon: <Database className="w-8 h-8" />,
  },
];

export function Skills() {
  return (
    <Section id="skills">
      <h2 className="text-3xl font-bold text-center mb-8">Skills</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {skillsData.map((skill, index) => (
          <Card key={index} className="flex flex-col items-center text-center">
            <CardHeader>
              <div className="mb-4">{skill.icon}</div>
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
