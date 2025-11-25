import { Section } from "@/components/ui/section";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const experienceData = [
  {
    company: "Tech Corp",
    role: "Senior Software Engineer",
    startDate: "2022",
    endDate: "Present",
    responsibilities: [
      "Led the development of a new microservices architecture.",
      "Mentored junior engineers and conducted code reviews.",
      "Improved application performance by 30%.",
    ],
  },
  {
    company: "Web Solutions Inc.",
    role: "Frontend Developer",
    startDate: "2020",
    endDate: "2022",
    responsibilities: [
      "Developed and maintained responsive user interfaces using React.",
      "Collaborated with designers to implement new features.",
      "Wrote and maintained unit and integration tests.",
    ],
  },
];

export function Experience() {
  return (
    <Section id="experience">
      <h2 className="text-3xl font-bold text-center mb-8">Experience</h2>
      <div className="space-y-8">
        {experienceData.map((exp, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{exp.role}</CardTitle>
              <CardDescription>
                {exp.company} | {exp.startDate} - {exp.endDate}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                {exp.responsibilities.map((resp, i) => (
                  <li key={i}>{resp}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
