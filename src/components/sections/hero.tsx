import Image from "next/image";
import { Section } from "@/components/ui/section";

export function Hero() {
  return (
    <Section id="hero" className="flex flex-col items-center justify-center text-center">
      <Image
        src="/profile.jpg" // Placeholder image
        alt="Profile Picture"
        width={150}
        height={150}
        className="rounded-full object-cover mb-4"
      />
      <h1 className="text-5xl font-bold mb-2">Your Name</h1>
      <p className="text-xl text-muted-foreground mb-8">
        A short intro about who I am and what I do.
      </p>
      <a
        href="/your-resume.pdf" // Placeholder resume
        download
        className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
      >
        Download Resume
      </a>
    </Section>
  );
}
