import { useUser } from '@clerk/nextjs';
import Sidebar from './sidebar';
import TopBar from './topbar';
import { setUserId } from '@/services/notes';
import useNotes from '@/hooks/useNotes';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  const { user } = useUser();
  const { refetch } = useNotes();

  useEffect(() => {
    if (user) {
      setUserId(user.id);
      refetch();
    }
  }, [user, refetch]);

  return (
    <main className="font-sans">
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
