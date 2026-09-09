import PhasePlaceholder from "@/components/PhasePlaceholder";
export const metadata = { title: "Inbox" };
export default function InboxPage() {
  return (
    <PhasePlaceholder
      title="Inbox"
      blurb="Paste in messages, or connect Gmail and Slack later. The AI sorts them by priority and tells you why."
      phase={4}
    />
  );
}
