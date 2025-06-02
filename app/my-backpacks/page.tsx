import { BackpacksList } from "@/components/pages/backpack-builder/backpacks-list";

export default function MyBackpacksPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">My Backpacks</h1>
      <BackpacksList />
    </div>
  );
} 