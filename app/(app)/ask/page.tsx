import PhasePlaceholder from "@/components/PhasePlaceholder";
export const metadata = { title: "Ask anything" };
export default function AskPage() {
  return (
    <PhasePlaceholder
      title="Ask anything"
      blurb="Ask the assistant in plain words. It answers in your brand voice using what you have taught it."
      phase={3}
    />
  );
}
