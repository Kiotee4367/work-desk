import PhasePlaceholder from "@/components/PhasePlaceholder";
export const metadata = { title: "Notebook" };
export default function NotebookPage() {
  return (
    <PhasePlaceholder
      title="Notebook"
      blurb="Add documents and web research on the left. Ask questions on the right. Answers come only from your sources."
      phase={5}
    />
  );
}
