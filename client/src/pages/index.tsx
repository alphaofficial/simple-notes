import RootLayout from '@/components/rootLayout';

function Home() {
  return (
    <RootLayout>
      <div className="overflow-scroll p-8">
        <div>
          <h1 className="text-4xl font-semibold">Welcome to Simple Notes</h1>
        </div>
      </div>
    </RootLayout>
  );
}

export default function Page({ fallback, notes }: any) {
  return <Home />;
}
