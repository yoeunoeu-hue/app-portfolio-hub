import { Section } from "@/components/ui/section";
import { notFound } from "next/navigation";

// This is a placeholder for the actual data fetching logic.
const getAchievementData = async (slug: string) => {
  const achievements = [
    {
      title: "First Place at Hackathon",
      slug: "hackathon-winner",
      description: "Won first place in the annual university hackathon.",
      content:
        "Full story of the hackathon, the challenges, and the winning project.",
      date: "2023-05-15",
    },
    {
      title: "Published Research Paper",
      slug: "research-paper",
      description: "Published a paper on novel machine learning techniques.",
      content:
        "Details about the research paper, the abstract, and a link to the publication.",
      date: "2024-01-10",
    },
  ];

  const achievement = achievements.find((a) => a.slug === slug);
  if (!achievement) {
    return null;
  }
  return achievement;
};

export default async function AchievementPage({
  params,
}: {
  params: { slug: string };
}) {
  const achievement = await getAchievementData(params.slug);

  if (!achievement) {
    notFound();
  }

  return (
    <Section id={achievement.slug} className="py-12">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-4">{achievement.title}</h1>
        <p className="text-lg text-muted-foreground mb-4">
          {new Date(achievement.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="text-lg text-muted-foreground mb-8">
          {achievement.description}
        </p>
        <div className="prose dark:prose-invert max-w-none">
          {achievement.content}
        </div>
      </div>
    </Section>
  );
}
