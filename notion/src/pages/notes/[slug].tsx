import Editor from '@/components/editor';
import { getNotes } from '@/services/notes';
import { useEffect } from 'react';
import { useNoteStore } from '@/store/noteStore';
import { GetStaticPaths } from 'next';
import { NoteInterface } from '@/types/notes.interface';
import { slugify } from '@/utilities/slugify';
import Layout from '@/components/layout';

export const getStaticPaths: GetStaticPaths = async () => {
  const notes = await getNotes();
  return {
    paths: notes.map((note: NoteInterface) => ({
      params: { slug: slugify(note.title) },
    })),
    fallback: true, // false or "blocking"
  };
};

export const getStaticProps = async ({ params }: any) => {
  const notes = await getNotes();
  const [_, id] = params.slug.split(':');
  const note = notes.find((note: NoteInterface) => note.id === Number(id));
  return {
    props: {
      note,
    },
  };
};

export default function NotePage({ note }: { note: NoteInterface }) {
  const { setCurrentNote } = useNoteStore();
  useEffect(() => {
    setCurrentNote(note);
  }, [note, setCurrentNote]);
  return (
    <Layout>
      <div
        className="overflow-scroll"
        style={{
          maxHeight: 'calc(100vh - 40px)',
        }}
      >
        <Editor note={note} />
      </div>
    </Layout>
  );
}
