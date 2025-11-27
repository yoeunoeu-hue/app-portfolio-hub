import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export async function Projects() {
  const supabase = await createClient(cookies());

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (!projects || projects.length === 0) {
    return (
      <Section id="projects">
        <h2 className="text-3xl font-bold text-center mb-8">Projects</h2>
        <p className="text-center text-muted-foreground">No projects added yet.</p>
      </Section>
    );
  }

  return (
    <Section id="projects">
      <h2 className="text-3xl font-bold text-center mb-8">Projects</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link href={`/projects/${project.slug}`} key={project.id}>
            <Card className="overflow-hidden transform transition-transform duration-300 hover:scale-105">
              {project.image_url && (
                <Image
                  src={project.image_url}
                  alt={project.title}
                  width={500}
                  height={300}
                  className="w-full h-48 object-cover"
                />
              )}
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </Section>
  );
}
