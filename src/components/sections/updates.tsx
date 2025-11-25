import { Section } from "@/components/ui/section";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const updatesData = [
  {
    date: "2024-07-20",
    content: "Started working on a new side project using Next.js and Supabase.",
  },
  {
    date: "2024-07-15",
    content: "Gave a talk at a local meetup about the benefits of TypeScript.",
  },
  {
    date: "2024-07-10",
    content: "Published a new blog post on modern CSS techniques.",
  },
];

export function Updates() {
  // Sort updates by date in descending order
  const sortedUpdates = updatesData.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <Section id="updates">
      <h2 className="text-3xl font-bold text-center mb-8">Recent Updates</h2>
      <div className="space-y-4">
        {sortedUpdates.map((update, index) => (
          <Card key={index}>
            <CardHeader>
              <CardDescription>
                {new Date(update.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{update.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
