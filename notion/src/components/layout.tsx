import Sidebar from './sidebar';
import TopBar from './topbar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <main>
      <div className="max-h-screen flex flex-row">
        <div
          style={{
            width: '280px',
            background: 'rgb(251, 251, 250)',
          }}
        >
          <Sidebar />
        </div>
        <div className="w-full">
          <TopBar />
          <div className="content">{children}</div>
        </div>
      </div>
    </main>
  );
}
