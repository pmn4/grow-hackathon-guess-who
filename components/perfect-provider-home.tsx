"use client";

import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { SelectProvider } from "@/db/schema";
import { ProviderCard } from "./ProviderCard";
import { filterProviders } from "@/actions/provider-actions";
import { motion, AnimatePresence } from "framer-motion";
import { useGridScale } from "@/hooks/use-grid-scale";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

export default function PerfectProviderHome({
  providers,
}: {
  providers: SelectProvider[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [criteria, setCriteria] = useState("");
  const [activeProviderIds, setActiveProviderIds] = useState<string[]>(
    providers.map((p) => p.id)
  );
  const [perfectProvider, setPerfectProvider] = useState<SelectProvider | null>(
    null
  );

  const gridStyle = useGridScale(containerRef, providers.length);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filteredIds = await filterProviders(criteria, activeProviderIds);
    setActiveProviderIds(filteredIds);
    setCriteria("");
    if (filteredIds.length === 1) {
      const provider = providers.find((p) => p.id === filteredIds[0]);
      setPerfectProvider(provider || null);
    } else {
      setPerfectProvider(null);
    }
  };

  const handlePlayAgain = () => {
    setPerfectProvider(null);
    setActiveProviderIds(providers.map((p) => p.id));
  };

  const activeProviders = providers.filter((p) =>
    activeProviderIds.includes(p.id)
  );
  const inactiveProviders = providers.filter(
    (p) => !activeProviderIds.includes(p.id)
  );

  const sortedProviders = [
    ...inactiveProviders.slice(0, Math.floor(inactiveProviders.length / 2)),
    ...activeProviders,
    ...inactiveProviders.slice(Math.floor(inactiveProviders.length / 2)),
  ];

  const activeCount = activeProviderIds.length;
  const totalProviders = providers.length;
  const inactiveScale =
    1 - (0.1 * (totalProviders - activeCount)) / totalProviders;
  const activeScale =
    1 + (0.1 * (totalProviders - activeCount)) / totalProviders;

  const { width, height } = useWindowSize();

  return (
    <div className="flex flex-col h-screen">
      {perfectProvider && (
        <>
          <Confetti width={width} height={height} style={{ zIndex: 20 }} />
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-10">
            <motion.div
              className="p-4 rounded-lg shadow-lg w-full h-full flex flex-col items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", damping: 15, stiffness: 100 }}
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Congratulations, you found your Perfect Provider!
              </h2>
              <ProviderCard
                provider={perfectProvider}
                isActive={true}
                showDetails={true}
              />
              <div className="mt-4 flex space-x-4">
                <a
                  href="https://www.growtherapy.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                >
                  Book an Appointment Now
                </a>
                <button
                  onClick={handlePlayAgain}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600 transition"
                >
                  Play Again
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
      <div className="flex-none p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          Perfect Provider
        </h1>
        <p className="mb-4">Find the right provider for you!</p>
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Enter your criteria..."
            className="w-full max-w-md"
            value={criteria}
            onChange={(e) => setCriteria(e.target.value)}
          />
        </form>
      </div>
      <div className="flex-grow overflow-auto relative">
        <motion.div
          ref={containerRef}
          className="h-full w-full"
          style={gridStyle}
          layout
        >
          <AnimatePresence>
            {sortedProviders.map((provider) => (
              <motion.div
                key={provider.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  filter: activeProviderIds.includes(provider.id)
                    ? "grayscale(0%)"
                    : "grayscale(100%)",
                  scale: activeProviderIds.includes(provider.id)
                    ? activeScale
                    : inactiveScale,
                }}
                transition={{ type: "spring", damping: 15, stiffness: 100 }}
              >
                <ProviderCard provider={provider} isActive={true} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
