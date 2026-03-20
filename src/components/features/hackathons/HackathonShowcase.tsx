import HackathonCard from "@/components/features/hackathons/HackathonCard";
import { hackathons } from "@/lib/data";

export default function HackathonShowcase() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {hackathons.map((item) => (
        <HackathonCard key={`${item.title}-${item.date}`} item={item} />
      ))}
    </div>
  );
}
