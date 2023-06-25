import Editor from '@/components/editor';
import TopBar from '@/components/topbar';
import Sidebar from '@/components/sidebar';
import useNotesQuery from '@/hooks/useNotesQuery';
import { queryClient } from '@/lib/queryClient';
import { getNotes } from '@/services/notes';
import { dehydrate } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/hooks/queryKeys';
import { useEffect } from 'react';
import { useNoteStore } from '@/store/noteStore';

export async function getServerSideProps() {
  await queryClient.prefetchQuery([QUERY_KEYS.notes], getNotes);

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}

export default function Home() {
  const { notes } = useNotesQuery();
  const { setCurrentNote } = useNoteStore();
  useEffect(() => {
    if (notes.length) {
      const lastNoteCachedId = sessionStorage.getItem('lastNoteId');
      const lastNote = notes.find(
        (note) => note.id === Number(lastNoteCachedId),
      );
      setCurrentNote(lastNote ?? notes[0]);
    }
  }, [notes, setCurrentNote]);
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
