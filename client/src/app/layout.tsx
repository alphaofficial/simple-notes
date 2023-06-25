import Sidebar from "@/components/sidebar";
import "@/styles/globals.css";

export const metadata = {
  title: "Notion",
  description: "Notion clone built with Next.js and TailwindCSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="max-h-screen flex flex-row">
          <div
            style={{
              width: "280px",
              background: "rgb(251, 251, 250)",
            }}
          >
            <Sidebar />
          </div>
          <div className="w-full">{children}</div>
        </div>
      </body>
    </html>
  );
}
