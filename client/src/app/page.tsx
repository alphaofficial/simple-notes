import Editor from "@/components/editor";
import TopBar from "@/components/topbar";

export default function Home() {
  const content = {
    title: "Notion Clone",
    sections: [
      {
        type: "text",
        content: "This is a text section",
      },
      {
        type: "image",
        content: "https://picsum.photos/200",
      },
      {
        type: "text",
        content: "This is another text section",
      },
      {
        type: "code",
        content: "console.log('Hello World!')",
      },
      {
        type: "text",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae ali",
      },
    ],
  };
  return (
    <main>
      <div className="max-h-full overflow-scroll">
        <TopBar title={content.title} />
        <div className="h-52 w-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
        <div className="flex flex-row justify-center mt-8">
          <div className="w-2/3">
            <Editor />
          </div>
        </div>
      </div>
    </main>
  );
}
