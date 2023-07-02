interface LayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: LayoutProps) {
  return (
    <main className="font-sans">
      <div className="max-h-screen">
        <div className="w-full">
          <div className="flex flex-row items-center justify-center pt-16">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
