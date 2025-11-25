import Link from "next/link";
import { ModeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">Portfolio</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/#education"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Education
            </Link>
            <Link
              href="/#skills"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Skills
            </Link>
            <Link
              href="/#projects"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Projects
            </Link>
            <Link
              href="/#achievements"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Achievements
            </Link>
            <Link
              href="/#experience"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Experience
            </Link>
            <Link
              href="/#testimonials"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Testimonials
            </Link>
            <Link
              href="/#updates"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Updates
            </Link>
            <Link
              href="/#contact"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Contact
            </Link>
            <Link
              href="/admin/dashboard"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Admin
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
