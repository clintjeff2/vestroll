import AuthLayer from "@/components/features/auth/AuthLayer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayer>{children}</AuthLayer>;
}