import Editor from '@/components/editor';
import { useNoteStore } from '@/store/noteStore';
import RootLayout from '@/components/rootLayout';
import { GetServerSideProps } from 'next';
import { getAuth, buildClerkProps } from '@clerk/nextjs/server';
import NotesService, { setUserId } from '@/services/notes';
import { useEffect } from 'react';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const pagePath = ctx.resolvedUrl;
  const id = pagePath.split(':')[1];
  const { userId } = getAuth(ctx.req);
  if (!userId) {
    return {
      redirect: {
        destination: '/sign-in?redirect_url=' + ctx.resolvedUrl,
        permanent: false,
      },
    };
  }
  setUserId(userId);
  const note = await NotesService.getNote(Number(id));
  return { props: { note, ...buildClerkProps(ctx.req) } };
};

export default function NotePage({ note }: any) {
  const { currentNote, setCurrentNote } = useNoteStore();

  useEffect(() => {
    setCurrentNote(note);
  }, [note, setCurrentNote]);

  return (
    <RootLayout>
      <div
        className="overflow-scroll"
        style={{
          maxHeight: 'calc(100vh - 40px)',
        }}
      >
        <Editor note={currentNote ?? note} />
      </div>
    </RootLayout>
  );
}
