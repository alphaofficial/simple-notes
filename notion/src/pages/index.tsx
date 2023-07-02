import { getNotes } from '@/services/notes';
import { QUERY_KEYS } from '@/hooks/queryKeys';
import { SWRConfig, unstable_serialize } from 'swr';
import Layout from '@/components/layout';

export async function getStaticProps() {
  const notes = await getNotes();
  return {
    props: {
      fallback: {
        [unstable_serialize(QUERY_KEYS.notes)]: notes,
      },
    },
  };
}

function Home() {
  return (
    <Layout>
      <div className="overflow-scroll p-8">
        <p>Welcome</p>
      </div>
    </Layout>
  );
}

export default function Page({ fallback }: any) {
  return (
    <SWRConfig value={{ fallback }}>
      <Home />
    </SWRConfig>
  );
}
