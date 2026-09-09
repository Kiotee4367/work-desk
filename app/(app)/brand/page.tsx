import PhasePlaceholder from "@/components/PhasePlaceholder";
export const metadata = { title: "Brand library" };
export default function BrandPage() {
  return (
    <PhasePlaceholder
      title="Brand library"
      blurb="Your tone, voice, words to avoid, sign-off and a sample of your writing. The AI follows these every time."
      phase={2}
    />
  );
}
