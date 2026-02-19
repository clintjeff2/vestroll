import AuthLayer from "@/components/features/auth/AuthLayer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="light" data-theme="light">
      <AuthLayer>{children}</AuthLayer>
    </div>
  );
}
