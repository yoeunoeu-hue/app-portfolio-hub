import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import Image from "next/image";

const testimonialsData = [
  {
    name: "Jane Doe",
    photoUrl: "/jane-doe.jpg", // Placeholder image
    quote:
      "Working with this person was a fantastic experience. Their skills and dedication are unmatched.",
  },
  {
    name: "John Smith",
    photoUrl: "/john-smith.jpg", // Placeholder image
    quote:
      "An incredibly talented developer who brings great ideas to the table and executes them flawlessly.",
  },
];

export function Testimonials() {
  if (testimonialsData.length === 0) {
    return null;
  }

  return (
    <Section id="testimonials">
      <h2 className="text-3xl font-bold text-center mb-8">Testimonials</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {testimonialsData.map((testimonial, index) => (
          <Card key={index} className="p-6">
            <CardContent className="flex flex-col items-center text-center">
              <Image
                src={testimonial.photoUrl}
                alt={testimonial.name}
                width={80}
                height={80}
                className="rounded-full object-cover mb-4"
              />
              <p className="italic mb-4">"{testimonial.quote}"</p>
              <p className="font-semibold">{testimonial.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
