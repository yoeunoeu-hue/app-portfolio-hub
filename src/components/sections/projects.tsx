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

const projectsData = [
  {
    title: "Project One",
    slug: "project-one",
    description: "A brief description of the first project.",
    image: "/project-1.jpg", // Placeholder image
  },
  {
    title: "Project Two",
    slug: "project-two",
    description: "A brief description of the second project.",
    image: "/project-2.jpg", // Placeholder image
  },
  {
    title: "Project Three",
    slug: "project-three",
    description: "A brief description of the third project.",
    image: "/project-3.jpg", // Placeholder image
  },
];

export function Projects() {
  return (
    <Section id="projects">
      <h2 className="text-3xl font-bold text-center mb-8">Projects</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projectsData.map((project, index) => (
          <Link href={`/projects/${project.slug}`} key={index}>
            <Card className="overflow-hidden transform transition-transform duration-300 hover:scale-105">
              <Image
                src={project.image}
                alt={project.title}
                width={500}
                height={300}
                className="w-full h-48 object-cover"
              />
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
