import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import Link from "next/link";

const achievementsData = [
  {
    title: "First Place at Hackathon",
    slug: "hackathon-winner",
    description: "Won first place in the annual university hackathon.",
    date: "2023-05-15",
  },
  {
    title: "Published Research Paper",
    slug: "research-paper",
    description: "Published a paper on novel machine learning techniques.",
    date: "2024-01-10",
  },
];

export function Achievements() {
  if (achievementsData.length === 0) {
    return null;
  }

  return (
    <Section id="achievements">
      <h2 className="text-3xl font-bold text-center mb-8">Achievements</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {achievementsData.map((achievement, index) => (
          <Link href={`/achievements/${achievement.slug}`} key={index}>
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
