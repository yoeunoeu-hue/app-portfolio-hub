import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Section } from "@/components/ui/section";

const educationData = [
  {
    institution: "University of Example",
    degree: "Master of Science",
    fieldOfStudy: "Computer Science",
    startDate: "2022",
    endDate: "2024",
    description: "Focused on advanced algorithms and machine learning.",
  },
  {
    institution: "College of Demo",
    degree: "Bachelor of Arts",
    fieldOfStudy: "Web Development",
    startDate: "2018",
    endDate: "2022",
    description: "Built a strong foundation in front-end and back-end technologies.",
  },
];

export function Education() {
  return (
    <Section id="education">
      <h2 className="text-3xl font-bold text-center mb-8">Education</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {educationData.map((edu, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{edu.institution}</CardTitle>
              <CardDescription>
                {edu.degree} in {edu.fieldOfStudy}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {edu.startDate} - {edu.endDate}
              </p>
              <p className="mt-2">{edu.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
