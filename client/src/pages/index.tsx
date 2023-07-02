import { getNotes } from '@/services/notes';
import { QUERY_KEYS } from '@/hooks/queryKeys';
import { SWRConfig, unstable_serialize } from 'swr';
import RootLayout from '@/components/rootLayout';
import { NoteInterface } from '@/types/notes.interface';

export async function getStaticProps() {
  const notes = await getNotes();
  return {
    props: {
      notes,
      fallback: {
        [unstable_serialize(QUERY_KEYS.notes)]: notes,
      },
    },
  };
}

function Home({ notes }: { notes: NoteInterface[] }) {
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
  return (
    <SWRConfig value={{ fallback }}>
      <Home notes={notes} />
    </SWRConfig>
  );
}
