import { Card } from "@/components/ui/card";
import { SelectProvider } from "@/db/schema";
import Image from "next/image";

const colorPalette = [
  "from-pink-300 to-purple-400",
  "from-yellow-300 to-orange-400",
  "from-green-300 to-teal-400",
  "from-blue-300 to-indigo-400",
  "from-red-300 to-rose-400",
  "from-cyan-300 to-blue-400",
];

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

export function ProviderCard({
  isActive,
  provider,
  showDetails,
}: {
  isActive: boolean;
  provider: SelectProvider;
  showDetails?: boolean;
}) {
  const initials = provider.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const colorIndex = hashString(provider.name) % colorPalette.length;
  const gradientClass = colorPalette[colorIndex];

  return (
    <Card
      className={`relative overflow-hidden bg-gradient-to-br ${gradientClass} shadow-lg hover:shadow-xl transition-all duration-300 group ${
        showDetails
          ? "w-full h-full max-w-2xl max-h-2xl"
          : "aspect-[3/4] h-full w-full"
      }`}
    >
      <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
        <div className="w-full h-full bg-white rotate-45 transform origin-top-left"></div>
      </div>
      <div className="relative h-full w-full p-2 flex flex-col items-center justify-center">
        <div
          className={`${
            showDetails ? "w-1/2 h-1/2" : "w-4/5 h-4/5"
          } rounded-full overflow-hidden border-4 border-white shadow-lg relative mb-2 group-hover:scale-105 transition-transform duration-300`}
        >
          <Image
            src={provider.imageUrl || "/default-avatar.png"}
            alt={provider.name}
            layout="fill"
            objectFit="cover"
            objectPosition="center top"
            className="absolute inset-0"
          />
        </div>
        {showDetails ? (
          <div className="text-center mt-4">
            <h3 className="text-2xl font-bold text-white">{provider.name}</h3>
            <p className="text-lg text-white mt-2">{provider.description}</p>
          </div>
        ) : (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-90 px-3 py-1 rounded-full shadow-md group-hover:scale-105 transition-transform duration-300">
            <span className="text-sm font-bold text-gray-800">{initials}</span>
          </div>
        )}
      </div>
    </Card>
  );
}
