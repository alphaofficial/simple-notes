import Editor from '@/components/editor';
import TopBar from '@/components/topbar';
import Sidebar from '@/components/sidebar';
import useNotesQuery from '@/hooks/useNotesQuery';
import { queryClient } from '@/lib/queryClient';
import { getNotes } from '@/services/notes';
import { dehydrate } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/hooks/queryKeys';

export async function getServerSideProps() {
  await queryClient.prefetchQuery([QUERY_KEYS.notes], getNotes);

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}

export default function Home() {
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
          <div>
            <div
              className="overflow-scroll"
              style={{
                maxHeight: 'calc(100vh - 40px)',
              }}
            >
              <Editor />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
