import { Section } from "@/components/ui/section";
import { notFound } from "next/navigation";

// This is a placeholder for the actual data fetching logic.
const getProjectData = async (slug: string) => {
  const projects = [
    {
      title: "Project One",
      slug: "project-one",
      description: "A brief description of the first project.",
      content:
        "This is the full content for Project One. It can include more details, images, and even videos.",
      image: "/project-1.jpg",
    },
    {
      title: "Project Two",
      slug: "project-two",
      description: "A brief description of the second project.",
      content: "This is the full content for Project Two.",
      image: "/project-2.jpg",
    },
    {
      title: "Project Three",
      slug: "project-three",
      description: "A brief description of the third project.",
      content: "This is the full content for Project Three.",
      image: "/project-3.jpg",
    },
  ];

  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    return null;
  }
  return project;
};

export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = await getProjectData(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <Section id={project.slug} className="py-12">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
        <p className="text-lg text-muted-foreground mb-8">
          {project.description}
        </p>
        <div className="prose dark:prose-invert max-w-none">
          {project.content}
        </div>
      </div>
    </Section>
  );
}
