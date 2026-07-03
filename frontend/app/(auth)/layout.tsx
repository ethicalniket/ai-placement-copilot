export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex items-center justify-center bg-zinc-950 text-white">
        <div className="max-w-md p-8">
          <h1 className="text-5xl font-bold">
            AI Placement Copilot
          </h1>

          <p className="mt-6 text-zinc-300">
            AI Career Coach,
            Coding Arena,
            Mock Interviews,
            Placement Preparation.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center p-6">
        {children}
      </div>
    </div>
  );
}