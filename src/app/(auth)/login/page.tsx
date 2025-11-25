import { AuthForm } from "@/components/admin/auth-form";
import { Section } from "@/components/ui/section";

export default function LoginPage() {
  return (
    <Section className="min-h-[calc(100vh-theme(spacing.14))] flex items-center justify-center" id={""}>
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">Admin Login</h1>
        <AuthForm />
      </div>
    </Section>
  );
}
