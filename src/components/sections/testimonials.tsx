import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export async function Testimonials() {
  const supabase = await createClient(cookies());

  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <Section id="testimonials">
      <h2 className="text-3xl font-bold text-center mb-8">Testimonials</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="p-6">
            <CardContent className="flex flex-col items-center text-center">
              {testimonial.author_photo_url && (
                <Image
                  src={testimonial.author_photo_url}
                  alt={testimonial.author_name}
                  width={80}
                  height={80}
                  className="rounded-full object-cover mb-4"
                />
              )}
              <p className="italic mb-4">"{testimonial.quote}"</p>
              <p className="font-semibold">{testimonial.author_name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
