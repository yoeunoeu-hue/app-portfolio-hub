import { Section } from "@/components/ui/section";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
  const adminSections = [
    { name: "Skills", href: "/admin/dashboard/skills" },
    { name: "Projects", href: "/admin/dashboard/projects" },
    { name: "Achievements", href: "/admin/dashboard/achievements" },
    { name: "Experience", href: "/admin/dashboard/experience" },
    { name: "Education", href: "/admin/dashboard/education" },
    { name: "Testimonials", href: "/admin/dashboard/testimonials" },
    { name: "Updates", href: "/admin/dashboard/updates" },
    { name: "Contact Messages", href: "/admin/dashboard/contact-messages" },
  ];

  return (
    <Section id="admin-dashboard" className="min-h-[calc(100vh-theme(spacing.14))]">
      <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {adminSections.map((section, index) => (
          <Link href={section.href} key={index}>
            <Button variant="outline" className="w-full h-24 text-lg">
              {section.name}
            </Button>
          </Link>
        ))}
      </div>
    </Section>
  );
}
